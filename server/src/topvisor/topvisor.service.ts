import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosTopvisorInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { PositionsTopvisorDto } from './dto/positions-topvisor.dto';
import { FindProjectsTopvisorDto } from './dto/find-projects-topvisor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TopvisorProject } from './entities/topvisor-project.entity';
import { TTops } from './entities/tops.entity';
import { TDynamics } from './entities/dynamics.entity';
import { TPositionsSummary } from './entities/positions_summary.entity';
import { TResult } from './entities/result.entity';
import { TSearcher } from './entities/searchers.entity';
import { TRegion } from './entities/regions.entity';
import { THeader } from './entities/headers.entity';
import { TKeywords } from './entities/keywords.entity';
import { TPositionsData } from './entities/positions-data.entity';

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



    // save in my db
    @InjectRepository(TResult)
    private readonly tResultRepository: Repository<TResult>,


    @InjectRepository(TSearcher)
    private readonly tSearcherRepository: Repository<TSearcher>,


    @InjectRepository(TPositionsData)
    private readonly tPositionsDataRepository: Repository<TPositionsData>,


    @InjectRepository(TRegion)
    private readonly tRegionRepository: Repository<TRegion>,

    @InjectRepository(THeader)
    private readonly tHeaderRepository: Repository<THeader>,

    @InjectRepository(TKeywords)
    private readonly tKeywordsRepository: Repository<TKeywords>,

  ) { }


  // remote api-------------------------------------------------------------

  // получить проекты
  async fetchProjects(findProjectsDto: FindProjectsTopvisorDto) {

    let res = null

    // параметры
    const params = {
      ...findProjectsDto,
      include_positions_summary_params: {
        show_dynamics: 0,
        show_tops: 1
      },//показать хедеры
      show_searchers_and_regions: 1,
    }

    await axiosTopvisorInstance.get("/v2/json/get/projects_2/projects", { data: params }).then((response) => {
      res = response.data
    })

    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }


  // проверить позиции
  async checkPositions(positionsTopvisorDto: PositionsTopvisorDto) {

    const date1 = positionsTopvisorDto.date1.toISOString().substring(0, 10)
    const date2 = positionsTopvisorDto.date2.toISOString().substring(0, 10)

    let res = null

    const params = {
      ...positionsTopvisorDto,
      show_headers: 1,
      show_exists_dates: 1,
      date1: date1,
      date2: date2,
    }


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

    for (let project in projects) {
      let p = projects[project]

      let savedDynamic = null

      let regions = []

      for (let searcher in projects[project].searchers) {
        // console.log(projects[project].searchers[searcher].regions[0].index)
        regions.push(projects[project].searchers[searcher].regions[0].index)

      }

      // сохранить динамику
      if (p.positions_summary && p.positions_summary.dynamics) {
        savedDynamic = await this.tDynamicsRepository.save({
          ...p.positions_summary.dynamics,
          id_project: p.id
        })
      }


      // сохранить пощиции
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
          positions_summary: savedPosSummary,
          regions: regions
        }
      )

      // console.log(savedProject)
      // сохранить топы
      for (let top in p.positions_summary.tops) {

        await
          this.tTopsRepository.save({
            ...p.positions_summary.tops[top],
            id_project: p.id,
            positions_summary: savedPosSummary
          })
      }


    }
  }





  //  save positions в базу данных in result
  async savePositionDatabase(position: any) {

    // задать проект для поиска в списке
    let ftp = new FindProjectsTopvisorDto()
    ftp.project_id = position.headers.projects[0].id

    // find project
    const project: TopvisorProject = (await this.findProjects(ftp))[0]
    
    if(project == null){
      throw new HttpException('проекта не существует в базе данных', HttpStatus.BAD_REQUEST)
    }

    // результат
    const result = await this.tResultRepository.save(
      {
        project: project
      }
    )

    // ключевые фразы
    let keywords = position.keywords
    //  save keywords, can be async
    this.saveKeywords(keywords, result)


    // хедер
    const header = await this.tHeaderRepository.save(
      {
        result: result,
        dates: position.headers.dates
      }
    )

    // save searchers
    this.saveSearchers(header, position.headers.projects[0])

  }



  // save searchers
  async saveSearchers(header: THeader, project: any) {

    // пройти по проекту
    for (const i in project.searchers) {
      const srch = project.searchers[i]


      // console.log(project)
      // save searcher
      const searcher = await this.tSearcherRepository.save(
        {
          name: srch.name,
          header: header
        }
      )

      // go throught regions
      for (const io in srch.regions) {
        const rg = srch.regions[io]
        // save region
        const region = await this.tRegionRepository.save(
          {
            name: rg.name,
            index: rg.index,
            lang: rg.lang,
            device_name: rg.device_name,
            searcher: searcher
          }
        )
      }


    }


  }

  // сохранить коючевые слова
  async saveKeywords(keywords: any, result: TResult) {

    for (let i in keywords) {
      let key = keywords[i]

      // сохранить ключевое слово
      const keyword = await this.tKeywordsRepository.save(
        {
          result: result,
          name: key.name
        }
      )

      let positionsData = key.positionsData

      // пройти по позицям ключевых словам
      for (const dpr in positionsData) {
        // сохранить позицию
        const positionData = await this.tPositionsDataRepository.save(
          {
            dpr: dpr,
            position: positionsData[dpr].position,
            keyword: keyword
          }
        )
      }
      //  console.log(p)
    }
  }


  // удалить все проекты
  async clearProjects() {
    await this.topvisorProjectRepository.createQueryBuilder()
      .delete()
      .execute()
      .catch((err) => {
        console.log(err)
      })
  }


  // найти проекты 
  async findProjects(findProjectsTopvisorDto: FindProjectsTopvisorDto) {

    let query = this.topvisorProjectRepository
      .createQueryBuilder("topvisor_projects")
      .leftJoinAndSelect("topvisor_projects.positions_summary", "ps")
      .leftJoinAndSelect("ps.dynamics", "dynamics")
      .leftJoinAndSelect("ps.tops", "tops")


    query = this.filterProjects(findProjectsTopvisorDto, query)

    return await query.getMany()

  }

  // фильтровать проекты
  filterProjects(findProjectsDto: FindProjectsTopvisorDto, q: SelectQueryBuilder<TopvisorProject>) {

    // console.log(findProjectsDto)
    let query = findProjectsDto.search_string ? q.andWhere(
      "LOWER(topvisor_projects.name) like :search_string or LOWER(topvisor_projects.site) like :search_string",
      { search_string: `%${findProjectsDto.search_string}%` }) : q

    // find project by id
    query = findProjectsDto.project_id ? query.andWhere("topvisor_projects.id = :id", { id: findProjectsDto.project_id }) : query

    // order by
    for (let order in findProjectsDto.orders) {

      // sort by
      switch (findProjectsDto.orders[order].name) {
        case "date":
          query = query.orderBy("topvisor_projects.date", findProjectsDto.orders[order].direction == "ASC" ? "ASC" : "DESC")
          break
        case "name":
          query = query.orderBy("topvisor_projects.name", findProjectsDto.orders[order].direction == "ASC" ? "ASC" : "DESC")
          break
      }

    }

    return query
  }




  // other------------------------------------------------------

  async getTopvisorLastProject() {

    let query = this.topvisorProjectRepository
      .createQueryBuilder("topvisor_projects")
      .orderBy("topvisor_projects.date", "DESC")
      .take(1);

    const newestProject = await query.getOne();
    return newestProject;

  }

}
