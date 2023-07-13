import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosTopvisorInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { PositionsTopvisorDto } from './dto/positions-topvisor.dto';
import { FindProjectsTopvisorDto } from './dto/find-projects-topvisor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopvisorProject } from './entities/topvisor-project.entity';
import { TTops } from './entities/tops.entity';
import { TDynamics } from './entities/dynamics.entity';
import { TPositionsSummary } from './entities/positions_summary.entity';

@Injectable()
export class TopvisorService {

  constructor(
    @InjectRepository(TopvisorProject)
    private readonly topvisorProjectRepository: Repository<TopvisorProject>,

    @InjectRepository(TTops)
    private readonly tTopsRepository: Repository<TTops>,

    @InjectRepository(TDynamics)
    private readonly tDynamicsRepository: Repository<TDynamics>,

    @InjectRepository(TPositionsSummary)
    private readonly tPositionsSummaryRepository: Repository<TPositionsSummary>,

  ) { }


  // remote api-------------------------------------------------------------

  async fetchProjects(findProjectsDto: FindProjectsTopvisorDto) {

    let res = null

    const params = {
      ...findProjectsDto,
      include_positions_summary_params: {
        show_dynamics: 0,
        show_tops: 1
      },
      fields: ["id", "name", "site", "date"]
    }

    await axiosTopvisorInstance.get("/v2/json/get/projects_2/projects", { data: params }).then((response) => {
      res = response.data
    })

    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }



  async checkPositions(positionsTopvisorDto: PositionsTopvisorDto) {

    // console.log(positionsTopvisorDto)
    let res = null

    const params = {
      ...positionsTopvisorDto,
      show_headers: 1,
      show_exists_dates: 1
      // type_range: 2,

    }


    //       show_exists_dates:1,
    //  show_headers: 1,
    // show_top_by_depth: 10,
    // show_visitors: 1,
    // positions_fields: ["position", "relevant_url", "snippet_ext", "visitors"]
    // , orders: [],
    // group_folder_id_depth: 1,
    // filter_by_dynamic: [],
    // filter_by_positions: [],
    // filters: [],

    // fields: ["name", "positionStatus:88", "volume:63:0:1", "volume:63:0:2", "volume:63:0:3", "volume:63:0:5"]

    await axiosTopvisorInstance.get("/v2/json/get/positions_2/history", { data: params })
      .then((response) => {
        res = response.data
      })


    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }


  // database --------------------------------------------------------------------
  //  save projects в базу данных
  async saveProjectsDatabase(projects: any) {

    for (let project in projects.result) {
      let p = projects.result[project]


      // сохранить динамику
      const savedDynamic = await this.tDynamicsRepository.save({
        ...p.positions_summary.dynamics,
        id_project: p.id
      })



      const savedPosSummary = await this.tPositionsSummaryRepository.save(
        {
          ...p.positions_summary,
          dynamics: savedDynamic,
          id_project: p.id

        }
      )

      // console.log(savedDynamic)
      // сохранить проект
      const savedProject = await this.topvisorProjectRepository.save(
        {
          ...p,
          positions_summary: savedPosSummary
        }
      )

      // console.log(savedProject)
      // сохранить топы
      for (let top in p.positions_summary.tops) {

        console.log({
          ...p.positions_summary.tops[top],
          id_project: p.id,
          positions_summary: savedProject
        })
        await
          this.tTopsRepository.save({
            ...p.positions_summary.tops[top],
            id_project: p.id,
            positions_summary: savedPosSummary
          })


      }


    }
  }

  // найти проекты 
  async findProjects(findProjectsDto: FindProjectsDto) {

    let query = this.topvisorProjectRepository
      .createQueryBuilder("topvisor_projects")
      .leftJoinAndSelect("topvisor_projects.positions_summary", "ps")
      .leftJoinAndSelect("ps.dynamics", "dynamics")
      .leftJoinAndSelect("ps.tops", "tops")

    query = findProjectsDto.search_string ? query.andWhere(
      "LOWER(topvisor_projects.name) like :search_string or LOWER(topvisor_projects.site) like :search_string",
      { search_string: `%${findProjectsDto.search_string}%` }) : query

    return await query.getMany()

  }

}
