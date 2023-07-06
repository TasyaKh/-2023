import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosTopvisorInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';

@Injectable()
export class TopvisorService {


  async findProjects(findProjectsDto:FindProjectsDto) {

    let res = null

    const params = {
      limit:findProjectsDto.limit,
      offset:findProjectsDto.offset,
      include_positions_summary_params:{
        show_dynamics: 0,
        show_tops:1
      },
      fields:["id","name", "site", "date"]
    }

    await axiosTopvisorInstance.get("/v2/json/get/projects_2/projects", {data:params}).then((response) => {
      res = response.data
    })

    if (res.errors){
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }
    
    return res
  }
}
