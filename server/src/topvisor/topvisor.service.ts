import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosTopvisorInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { PositionsTopvisorDto } from './dto/positions-topvisor.dto';

@Injectable()
export class TopvisorService {

  // async findProject(id: number) {

  //   let res = null

  //   await axiosTopvisorInstance.get("/v2/json/get/project/" + id)
  //     .then((response) => {
  //       res = response.data
  //     })


  //   if (res.errors) {
  //     throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
  //   }

  //   return res
  // }

  async findProjects(findProjectsDto: FindProjectsDto) {

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
      type_range: 2,
     
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

}
