import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';
import { YandexProject } from './entities/yandex-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YData } from './entities/data.entity';
import { YMetric } from './entities/metrics.entity';

@Injectable()
export class YandexService {

  constructor(
    @InjectRepository(YandexProject)
    private readonly yandexProjectRepository: Repository<YandexProject>,

    @InjectRepository(YData)
    private readonly yDataRepository: Repository<YData>,

    @InjectRepository(YMetric)
    private readonly yMetricRepository: Repository<YMetric>,

  ) { }

  async fetchProjects(findProjectsDto: FindProjectsDto) {

    let res = null

    const params = {
      ...findProjectsDto
    }

    await axiosYandexInstance.get("/management/v1/counters", { params: params }).then((response) => {
      res = response.data
    })

    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }

  // найти дашборды
  async fetchDashboards(findDashboardsYandexDto: FindDashboardsYandexDto) {

    console.log(findDashboardsYandexDto)
    let res = null

    const params = {
      ...findDashboardsYandexDto
    }

    await axiosYandexInstance.get("/stat/v1/data", { params: params }).then((response) => {
      res = response.data
    })

    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }

  // найти дашборды, временной диапазон
  async fetchDashboardsDevice(findDashboardsYandexDto: FindDashboardsYandexDto) {

    let res = null

    const params = {
      ...findDashboardsYandexDto
    }

    await axiosYandexInstance.get("/stat/v1/data/bytime", { params: params }).then((response) => {
      res = response.data
    })

    if (res.errors) {
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }

    return res
  }

  // database------------------------------------------------------------------------------
  //  save projects
  async saveProjectsDatabase(projects: any) {
    // console.log(projects.counters[0])

    for (let project in projects.counters) {
      this.yandexProjectRepository.save([projects.counters[project]])

    }
  }

  // найти проекты
  async findProjects(findProjectsDto: FindProjectsDto) {

   
    let query = this.yandexProjectRepository
      .createQueryBuilder("yandex_project")

    query = findProjectsDto.search_string ? query.andWhere(
      "LOWER(yandex_project.name) like :search_string or LOWER(yandex_project.site) like :search_string",
      { search_string: `%${findProjectsDto.search_string}%` }) : query

    return await query.getMany()

  }

  // найти дашборды по суммарному времени
  async findDashboards(findDashboardsYandexDto: FindDashboardsYandexDto, type_dimention: string) {

    let query = this.yDataRepository
      .createQueryBuilder("y_data")
      .leftJoin("y_data.metrics", "metrics")
      .addSelect("SUM(metrics.metric)", "sum")
      .groupBy('y_data.id')
      .orderBy("sum", "DESC")
      .where("y_data.project_id = :project_id and y_data.type_dimention = :type_dimention",
        {
          project_id: findDashboardsYandexDto.ids,
          type_dimention: type_dimention
        })
      .andWhere("metrics.date >= :startDate and metrics.date <= :endDate",
        {
          startDate: findDashboardsYandexDto.date1,
          endDate: findDashboardsYandexDto.date2
        })

    return await query.getRawMany()
  }


  // найти дашборды по промежуткам времени
  async findDashboardsBytime(findDashboardsYandexDto: FindDashboardsYandexDto, type_dimention: string) {

    let query = this.yDataRepository
      .createQueryBuilder("y_data")
      .leftJoinAndSelect("y_data.metrics", "metrics")
      .where("y_data.project_id = :project_id and y_data.type_dimention = :type_dimention",
        {
          project_id: findDashboardsYandexDto.ids,
          type_dimention: type_dimention
        })
      .andWhere("metrics.date >= :startDate and metrics.date <= :endDate",
        {
          startDate: findDashboardsYandexDto.date1,
          endDate: findDashboardsYandexDto.date2
        })

    return await query.getMany()
  }


  //  save projects
  async saveDashboardsByTime(dashboards: any, type_dimention: string) {

    const dates = dashboards.time_intervals


    for (let i in dashboards.data) {

      const savedData = await this.yDataRepository.save({
        name: dashboards.data[i].dimensions[0].name,
        project_id: dashboards.query.ids[0],
        type_dimention: type_dimention,
        favicon:dashboards.data[i].dimensions[0].favicon
      })

      // console.log(dashboards.data)

      for (let io in dashboards.data[i].metrics[0]) {

        await this.yMetricRepository.save({
          metric: dashboards.data[i].metrics[0][io],
          date: dates[io][0],
          project_id: dashboards.query.ids[0],
          data: savedData
        })

      }


    }



  }
}
