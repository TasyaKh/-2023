import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { YandexProject } from './entities/yandex-project.entity';
import { YQuery } from './entities/query.entity';

@ApiTags('yandex')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('yandex')
export class YandexController {
  constructor(private readonly yandexService: YandexService) { }

  // database------------------------------------------------------------------------------
  // получить список проектов
  @ApiOperation({ summary: "получить список проектов" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type:[YandexProject]})
  @Get('projects')
  async findProjects(@Query() findProjectsDto: FindProjectsDto) {

    const projects = await this.yandexService.findProjects(findProjectsDto);

    return projects
  }

  // визиты
  @ApiOperation({ summary: "получить данные с визитами" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type:[ YQuery]})
  @Get('dashboards/visits')
  async findDashboardsVisits(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboardsBytime(dshbYDto, "visits");

    return dsh
  }

  // 4) визиты получить данные посещений девайсов
  @ApiOperation({ summary: "получить данные об устройствах" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @Get('dashboards/device')
  async findDashboardsDevice(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "device");

    return dsh
  }

  // 3)  источники трафика
  @ApiOperation({ summary: "получить данные  источники трафика" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @Get('dashboards/source-traffic')
  async findDashboardsSourceTraffic(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "source-traffic");

    return dsh
  }

  // 5) визиты доля брендового и небрендового траффика
  @ApiOperation({ summary: "получить данные  визиты доля брендового и небрендового траффика" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @Get('dashboards/search-phrase')
  async findDashboardsSearchPhrace(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "search-phrase");

    return dsh
  }

  // 6) посещаемость из поисковых систем
  @ApiOperation({ summary: "посещаемость из поисковых систем" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type:[YQuery]})
  @Get('dashboards/search-engine')
  async findDashboardsSearchEngine(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboardsBytime(dshbYDto, "search-engine");

    return dsh
  }



  // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
  @ApiOperation({ summary: "Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @Get('dashboards/browsers')
  async findDashboardsBrowsers(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "browsers");

    return dsh

  }

  // конверсии
  @ApiOperation({ summary: "конверсии" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type:[YQuery]})
  @Get('dashboards/goal-dimension')
  async findDashboardsGoalDimension(@Query() dshbYDto: FindDashboardsYandexDto) {
    const dsh = await this.yandexService.findDashboardsBytime(dshbYDto, "goal-dimension");

    return dsh
  }






  // remote api-------------------------------------------------------------
  // получить список проектов

  @ApiOperation({ summary: "api получить проекты с удаленного апи" })
  @Get('fetch/projects')
  async fetchProjects(@Query() findProjectsDto: FindProjectsDto) {

    const projects = await this.yandexService.fetchProjects(findProjectsDto);

    // await this.yandexService.saveProjectsDatabase(projects.counters)
    return projects
  }

  // 3)  источники трафика
  @ApiOperation({ summary: "api получить источники трафика с удаленного апи" })
  @Get('dashboards/fetch/source-traffic')
  async fetchDashboardsSourceTraffic(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignTrafficSource")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "source-traffic");

    return dsh
  }

  // 4) визиты получить данные посещений девайсов
  @ApiOperation({ summary: "api получить данные посещений девайсов с удаленного апи" })
  @Get('dashboards/fetch/device')
  async fetchDashboardsDevice(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:deviceCategory")
    dshbYDto.filters.push("ym:s:deviceCategory!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "device");

    return dsh
  }


  // 5) визиты доля брендового и небрендового траффика
  @ApiOperation({ summary: "api получить данные доля брендового и небрендового траффика с удаленного апи" })
  @Get('dashboards/fetch/search-phrase')
  async fetchDashboardsSearchPhrace(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "search-phrase");

    return dsh
  }


  // 6) посещаемость из поисковых систем
  @ApiOperation({ summary: "api получить данные посещаемость из поисковых систем с удаленного апи" })
  @Get('dashboards/fetch/search-engine')
  async fetchDashboardsSearchEngine(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngine")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10

    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);
    await this.yandexService.saveDashboardsByTime(dsh, "search-engine");

    return dsh
  }

  // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
  @ApiOperation({ summary: "api получить данные поисковые системы информация о поисковых системах, которые привели посетителей на сайт) с удаленного апи" })
  @Get('dashboards/fetch/browsers')
  async fetchDashboardsBrowsers(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignSearchEngine")
    dshbYDto.filters.push("ym:s:LastSignSearchEngine!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);
    await this.yandexService.saveDashboardsByTime(dsh, "browsers");

    return dsh
  }


  // конверсии
  @ApiOperation({ summary: "api получить конверсии с удаленного апи" })
  @Get('dashboards/fetch/goal-dimension')
  async fetchDashboardsGoalDimension(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:sumVisits")
    dshbYDto.dimensions.push("ym:s:goalDimension")
    dshbYDto.group = "day"
    


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);
    await this.yandexService.saveDashboardsByTime(dsh, "goal-dimension");

    return dsh
  }


  // visits
  @ApiOperation({ summary: "api получить визиты с удаленного апи" })
  @Get('dashboards/fetch/visits')
  async fetchDashboardsVisits(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 100


    const dsh = await this.yandexService.fetchDashboardsByTime(dshbYDto);
    // await this.yandexService.saveDashboardsByTime(dsh, "visits");

    return dsh
  }

}
