import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';
import { YandexProject } from './entities/yandex-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YData } from './entities/data.entity';
import { YMetric } from './entities/metrics.entity';
import { browsersDashboard, deviceDashboard, searchEngineDashboard, searchPhraseDashboard, sourceTrafficDashboard } from './dashboards';
import { Cron } from '@nestjs/schedule';


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



  // api----------------------------------------------------------------------
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
  async saveProjectsDatabase(projects: any,
    dateStartDateDashboard: Date, dateEndDateDashboard: Date) {

     
    for (let project in projects) {
     
      console.log(projects[project])
      await this.yandexProjectRepository.save({
        ...projects[project],
        id: projects[project].id
      })
      console.log("af")
      // сохранить данные графиков
      this.fetchAndSaveGraphics(projects[project].id, dateStartDateDashboard,
        dateEndDateDashboard)
    }
  }


  // вытащить данные из сервера по ид проекта и на основе промежутков времени
  async fetchAndSaveGraphics(project_id: number,
    dateStartDateDashboard: Date, dateEndDateDashboard: Date) {


    // device
    const deviceD = await this.fetchDashboards(
      deviceDashboard(project_id,
        dateStartDateDashboard, dateEndDateDashboard))

    // save dashboards
    await this.saveDashboardsByTime(deviceD, "device")


    // sourceTrafficD
    const sourceTrafficD = await this.fetchDashboards(
      sourceTrafficDashboard(project_id,
        dateStartDateDashboard, dateEndDateDashboard))

    // save dashboards
    await this.saveDashboardsByTime(sourceTrafficD, "source-traffic")


    // search-phrase
    const searchPhraseD = await this.fetchDashboards(
      searchPhraseDashboard(project_id,
        dateStartDateDashboard, dateEndDateDashboard))

    // save dashboards
    await this.saveDashboardsByTime(searchPhraseD, "search-phrase")



    // search-engine
    const searchEngineD = await this.fetchDashboards(
      searchEngineDashboard(project_id,
        dateStartDateDashboard, dateEndDateDashboard))

    // save dashboards
    await this.saveDashboardsByTime(searchEngineD, "search-engine")


    // browsers
    const browsersD = await this.fetchDashboards(
      browsersDashboard(project_id,
        dateStartDateDashboard, dateEndDateDashboard))

    // save dashboards
    await this.saveDashboardsByTime(browsersD, "browsers")
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
  async saveDashboardsByTime(dashboard: any, type_dimention: string) {

    const dates = dashboard.time_intervals


    for (let i in dashboard.data) {

      const savedData = await this.yDataRepository.save({
        name: dashboard.data[i].dimensions[0].name,
        project_id: dashboard.query.ids[0],
        type_dimention: type_dimention,
        favicon: dashboard.data[i].dimensions[0].favicon
      })

      // console.log(dashboards.data)

      for (let io in dashboard.data[i].metrics[0]) {

        await this.yMetricRepository.save({
          metric: dashboard.data[i].metrics[0][io],
          date: dates[io][0],
          project_id: dashboard.query.ids[0],
          data: savedData
        })

      }


    }
  }


  // other------------------------------------------------------

  async getYandexLastProject() {

    let query = this.yandexProjectRepository
      .createQueryBuilder("yandex_project")
      .orderBy("yandex_project.create_time", "DESC")
      .take(1);

    const newestProject = await query.getOne();
    return newestProject;

  }



}
