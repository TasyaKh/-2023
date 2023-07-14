import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';

@Injectable()
export class YandexService {

  async findProjects(findProjectsDto:FindProjectsDto) {

    let res = null

    const params = {
     ...findProjectsDto
    }

    await axiosYandexInstance.get("/management/v1/counters", {params:params}).then((response) => {
      res = response.data
    })

    if (res.errors){
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }
    
    return res
  }

  // найти дашборды
 async findDashboards(findDashboardsYandexDto: FindDashboardsYandexDto) {
   
  console.log(findDashboardsYandexDto)
  let res = null

    const params = {
     ...findDashboardsYandexDto
    }

    await axiosYandexInstance.get("/stat/v1/data", {params:params}).then((response) => {
      res = response.data
    })

    if (res.errors){
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
 }

  // найти дашборды, временной диапазон
  async findDashboardsByTime(findDashboardsYandexDto: FindDashboardsYandexDto) {
   
    let res = null
  
      const params = {
       ...findDashboardsYandexDto
      }
  
      await axiosYandexInstance.get("/stat/v1/data/bytime", {params:params}).then((response) => {
        res = response.data
      })
  
      if (res.errors){
        throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
      }
  
      return res
   }
}
