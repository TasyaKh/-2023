import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';
import { YandexProject } from './entities/yandex-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class YandexService {

  constructor(
    @InjectRepository(YandexProject)
    private readonly yandexProjectRepository: Repository<YandexProject>,
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
  async findDashboards(findDashboardsYandexDto: FindDashboardsYandexDto) {

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
  async findDashboardsByTime(findDashboardsYandexDto: FindDashboardsYandexDto) {

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
      "LOWER(yandex_projects.name) like :search_string or LOWER(yandex_projects.site) like :search_string",
      { search_string: `%${findProjectsDto.search_string}%` }) : query

    return await query.getMany()

  }
}
