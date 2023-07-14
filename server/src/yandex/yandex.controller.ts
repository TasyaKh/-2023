import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';

@Controller('yandex')
export class YandexController {
  constructor(private readonly yandexService: YandexService) { }

  // database------------------------------------------------------------------------------
  // получить список проектов
  @Get('projects')
  async findProjects(@Query() findProjectsDto: FindProjectsDto) {

    const projects = await this.yandexService.findProjects(findProjectsDto);

    return projects
  }

  // 4) визиты получить данные посещений девайсов
  @Get('dashboards/device')
  async findDashboardsDevice(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "device");

    return dsh
  }

  // 3)  источники трафика
  @Get('dashboards/source-traffic')
  async findDashboardsSourceTraffic(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "source-traffic");

    return dsh
  }

  // 5) визиты доля брендового и небрендового траффика
  @Get('dashboards/search-phrase')
  async findDashboardsSearchPhrace(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboards(dshbYDto, "search-phrase");

    return dsh
  }

  // 6) посещаемость из поисковых систем
  @Get('dashboards/search-engine')
  async findDashboardsSearchEngine(@Query() dshbYDto: FindDashboardsYandexDto) {

    const dsh = await this.yandexService.findDashboardsBytime(dshbYDto, "search-engine");

    return dsh
  }


  
  // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
  @Get('dashboards/browsers')
  async findDashboardsBrowsers(@Query() dshbYDto: FindDashboardsYandexDto) {
    
    const dsh = await this.yandexService.findDashboards(dshbYDto, "browsers");

    return dsh
 
  }






  // remote api-------------------------------------------------------------
  // получить список проектов
  @Get('fetch/projects')
  async fetchProjects(@Query() findProjectsDto: FindProjectsDto) {

    const projects = await this.yandexService.fetchProjects(findProjectsDto);

    await this.yandexService.saveProjectsDatabase(projects)
    return projects
  }

  // 3)  источники трафика
  @Get('dashboards/fetch/source-traffic')
  async fetchDashboardsSourceTraffic(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignTrafficSource")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")


    const dsh = await this.yandexService.fetchDashboardsDevice(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "source-traffic");

    return dsh
  }

  // 4) визиты получить данные посещений девайсов
  @Get('dashboards/fetch/device')
  async fetchDashboardsDevice(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:deviceCategory")
    dshbYDto.filters.push("ym:s:deviceCategory!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")


    const dsh = await this.yandexService.fetchDashboardsDevice(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "device");

    return dsh
  }


  // 5) визиты доля брендового и небрендового траффика
  @Get('dashboards/fetch/search-phrase')
  async fetchDashboardsSearchPhrace(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10


    const dsh = await this.yandexService.fetchDashboardsDevice(dshbYDto);

    await this.yandexService.saveDashboardsByTime(dsh, "search-phrase");

    return dsh
  }


  // 6) посещаемость из поисковых систем
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

    const dsh =  await this.yandexService.fetchDashboardsDevice(dshbYDto);
    await this.yandexService.saveDashboardsByTime(dsh, "search-engine");

    return dsh
  }

  // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
  @Get('dashboards/fetch/browsers')
  async fetchDashboardsBrowsers(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignSearchEngine")
    dshbYDto.filters.push("ym:s:LastSignSearchEngine!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10

    
    const dsh = await this.yandexService.fetchDashboardsDevice(dshbYDto);
    await this.yandexService.saveDashboardsByTime(dsh, "browsers");

    return dsh
  }




}
