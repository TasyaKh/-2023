import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';
import { YandexProject } from './entities/yandex-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YData } from './entities/data.entity';
import { YMetric } from './entities/metrics.entity';
import { browsersDashboard, deviceDashboard, goalDimensionDashboard, searchEngineDashboard, searchPhraseDashboard, sourceTrafficDashboard, visitsDashboard } from './dashboards';
import { YQuery } from './entities/query.entity';


@Injectable()
export class YandexService {

  constructor(
    @InjectRepository(YandexProject)
    private readonly yandexProjectRepository: Repository<YandexProject>,

    @InjectRepository(YData)
    private readonly yDataRepository: Repository<YData>,

    @InjectRepository(YMetric)
    private readonly yMetricRepository: Repository<YMetric>,

    @InjectRepository(YQuery)
    private readonly yQueryRepository: Repository<YQuery>,
  ) { }

  // constants
  // requestLimit = 10
  // delay = 1000
  // requestsCount = 0

  // api----------------------------------------------------------------------
  // получить проекты
  async fetchProjects(findProjectsDto: FindProjectsDto) {

    let res = null

    const params = {
      ...findProjectsDto
    }

    await axiosYandexInstance.get("/management/v1/counters", { params: params }).then((response) => {
      res = response.data
    }).catch((err)=>{
      console.log(err)
    })

    // if (res.errors) {
    //   throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    // }

    return res
  }

  // найти дашборды 
  async fetchDashboards(findDashboardsYandexDto: FindDashboardsYandexDto) {

    // await this.checkDelay()

    const date1 = findDashboardsYandexDto.date1 //.toISOString().substring(0, 10)
    const date2 = findDashboardsYandexDto.date2 //.toISOString().substring(0, 10)
   
    // console.log(findDashboardsYandexDto)
    let res = null

    const params = {
      ...findDashboardsYandexDto,
      date1: date1,
      date2: date2
    }

    //  console.log( findDashboardsYandexDto)
    await axiosYandexInstance.get("/stat/v1/data", { params: params }).then((response) => {
      res = response.data
    }).catch((err) => {
      console.log("err", err.response)
    })


    return res
  }


  // найти дашборды, временной диапазон
  async fetchDashboardsByTime(findDashboardsYandexDto: FindDashboardsYandexDto) {

    let res = null

    // let date1 = findDashboardsYandexDto.date1
    // let date2 = findDashboardsYandexDto.date2

    const date1 = findDashboardsYandexDto.date1.toISOString().substring(0, 10)
    const date2 = findDashboardsYandexDto.date2.toISOString().substring(0, 10)
   
    const params = {
      ...findDashboardsYandexDto,
      date1: date1,
      date2: date2
    }


    await axiosYandexInstance.get("/stat/v1/data/bytime", { params: params }).then((response) => {
      res = response.data

    }).catch((err) => {
      console.log(err)
    })


    return res
  }








  // database------------------------------------------------------------------------------
  //  save projects
  async saveProjectsDatabase(projects: any) {

    for (let project in projects) {

      await this.yandexProjectRepository.save({
        ...projects[project],
        id: projects[project].id
      })
      // сохранить данные графиков
      // this.fetchAndSaveGraphics(projects[project].id, dateStartDateDashboard,
      //   dateEndDateDashboard)
    }
  }


  // вытащить данные из сервера по ид проекта и на основе промежутков времени
  async fetchAndSaveGraphics(project_id: number,
    dateStartDateDashboard: Date, dateEndDateDashboard: Date) {

    // console.log(project_id, dateStartDateDashboard, dateEndDateDashboard)

    // device
    await this.fetchAndSaveGraphic(deviceDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "device")

    // sourceTrafficD
    await this.fetchAndSaveGraphic(sourceTrafficDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "source-traffic")

    // search-phrase    
    await this.fetchAndSaveGraphic(searchPhraseDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "search-phrase")

    // search-engine
    await this.fetchAndSaveGraphic(searchEngineDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "search-engine")


    // browsers
    await this.fetchAndSaveGraphic(browsersDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "browsers")


    // конверсии
    await this.fetchAndSaveGraphic(goalDimensionDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "goal-dimension")

    // визиты
    await this.fetchAndSaveGraphic(visitsDashboard(project_id,
      dateStartDateDashboard, dateEndDateDashboard), "visits")


  }


  private async fetchAndSaveGraphic(findDashboardsYandexDto: FindDashboardsYandexDto, dimension_type: string) {
    
    const dsb = await this.fetchDashboardsByTime(findDashboardsYandexDto)

    if (dsb)
      this.saveDashboardsByTime(dsb, dimension_type)
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

      .leftJoin("y_data.query", "y_query")
      .leftJoin("y_query.project", "project")
      .leftJoin("y_data.metrics", "metrics")

      .addSelect("SUM(metrics.metric)", "sum")
      .groupBy('y_data.id')
      .orderBy("sum", "DESC")
      .where("project.id = :project_id and y_query.type_dimention = :type_dimention",
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

    // let date1 = new Date("2023-06-15T00:00:00.000Z")
    // let date2 = new Date("2023-06-15T23:59:00.000Z")

    // console.log(findDashboardsYandexDto)

    let query = this.yQueryRepository
      .createQueryBuilder("y_query")
      .leftJoinAndSelect("y_query.data", "y_data")
      .leftJoinAndSelect("y_data.metrics", "metrics")
      .leftJoin("y_query.project", "project")
      .where("project.id = :project_id and y_query.type_dimention = :type_dimention",
        {
          project_id: findDashboardsYandexDto.ids,
          type_dimention: type_dimention
        })
      .andWhere("metrics.date >= :startDate and metrics.date <= :endDate",
        {
          startDate: findDashboardsYandexDto.date1,
          endDate: findDashboardsYandexDto.date2
        })

    return await query.getOne()
  }


  //  save projects
  async saveDashboardsByTime(dashboard: any, type_dimention: string) {

    const dates = dashboard.time_intervals
    const prId: number = dashboard.query.ids[0]
   
    for (let i in dashboard.data) {
      // console.log(dashboard.data[i])
      // проверить если данный запрос существует в бд
      let yQuery = await this.getExistQuery(prId, type_dimention)

      // Find the YandexProjectEntity object based on the ID
      const project = await this.yandexProjectRepository.findOne({ where: { id: prId } });

      // если данный тип данных был первый раз найден
      if (yQuery == null) {
        yQuery = await this.yQueryRepository.save({
          totals: dashboard.totals,
          type_dimention: type_dimention,
          project: project
        })
      }

     
      // проверить если данный тип сохраняемых данных существует для проекта
      let name = dashboard.data[i].dimensions[0] ? dashboard.data[i].dimensions[0].name : ""
      let yData = await this.getExistData(name, yQuery.id)

      let favicon = dashboard.data[i].dimensions[0] ? dashboard.data[i].dimensions[0].favicon : ""
      // если данный тип данных был первый раз найден
      if (yData == null) {
        yData = await this.yDataRepository.save({
          name: name,
          type_dimention: type_dimention,
          favicon: favicon,
          query: yQuery
        })
      }

      // console.log(dashboard.data[i].metrics)
      // console.log(dashboard.data[i].metrics.length)
      for (let io = 0; io < dashboard.data[i].metrics.length; io++) {
        const metric = dashboard.data[i].metrics[io]

        for (let k = 0; k < metric.length; k++) {

          // console.log(name)

          let res = await this.yMetricRepository.save({
            metric: metric[k],
            date: dates[k][0],
            data: yData,
            index: io
          })

        }
      }
    }
  }

  // получить существующщий запрос
  async getExistQuery(project_id: number, type_dimention: string) {

    let query = this.yQueryRepository
      .createQueryBuilder("y_query")
      .leftJoinAndSelect("y_query.project", "project")
      .where("project.id = :project_id and  y_query.type_dimention = :type_dimention", {
        project_id: project_id,
        type_dimention: type_dimention,
      })

    return query.getOne()
  }


  // получить сущетсвующие данные (например 3425353, device, ПК)
  async getExistData(name: string, queryId: number) {

    let query = this.yDataRepository
      .createQueryBuilder("y_data")
      .leftJoinAndSelect("y_data.query", "query")
      .where("y_data.name = :name and query.id = :query_id", {
        name: name,
        query_id: queryId
      })

    return query.getOne()
  }


  // удалить все проекты
  async clearProjects() {

    await this.yandexProjectRepository.createQueryBuilder()
      .delete()
      .execute()
      .catch((err) => {
        console.log(err)
      })
  }



  // other------------------------------------------------------

  // получить последний проект яндекса
  async getYandexLastProject() {

    let query = this.yandexProjectRepository
      .createQueryBuilder("yandex_project")
      .orderBy("yandex_project.create_time", "DESC")
      .take(1);

    const newestProject = await query.getOne();
    return newestProject;

  }

}
