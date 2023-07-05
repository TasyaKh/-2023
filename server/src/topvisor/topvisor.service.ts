import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTopvisorDto } from './dto/create-topvisor.dto';
import { UpdateTopvisorDto } from './dto/update-topvisor.dto';
import { axiosTopvisorInstance } from 'src/axios-instance';
import { TOPVISOR_API_URL } from 'src/config';
import { FindProjectsDto } from './dto/find-projects.dto';

@Injectable()
export class TopvisorService {
  create(createTopvisorDto: CreateTopvisorDto) {
    return 'This action adds a new topvisor';
  }


  async findProjects(findProjectsDto:FindProjectsDto) {

    let res = null

    const params = {
      limit:findProjectsDto.limit,
      offset:findProjectsDto.offset,
      include_positions_summary_params:{
        show_dynamics: 0,
        show_tops:1
      }
    }

    await axiosTopvisorInstance.get("/v2/json/get/projects_2/projects", {data:params}).then((response) => {
      res = response.data
    })

    if (res.errors){
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }
    
    return res
  }

  findOne(id: number) {
    return `This action returns a #${id} topvisor`;
  }

  update(id: number, updateTopvisorDto: UpdateTopvisorDto) {
    return `This action updates a #${id} topvisor`;
  }

  remove(id: number) {
    return `This action removes a #${id} topvisor`;
  }
}
