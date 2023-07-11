import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { FindDashboardsYandexDto } from './dto/find-dashboards.dto';

@Controller('yandex')
export class YandexController {
  constructor(private readonly yandexService: YandexService) { }

  // получить список проектов
  @Get('projects')
  findProjects(@Query() findProjectsDto: FindProjectsDto) {
    return this.yandexService.findProjects(findProjectsDto);
  }

  // визиты получить данные источники трафика
  @Get('dashboards/source-traffic')
  findDashboardsSourceTraffic(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignTrafficSource")
    dshbYDto.group = "all"
    dshbYDto.sort.push("-ym:s:visits")

    return this.yandexService.findDashboards(dshbYDto);
  }

  // 4) визиты получить данные посещений девайсов
  @Get('dashboards/device')
  findDashboardsDevice(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:deviceCategory")
    dshbYDto.filters.push("ym:s:deviceCategory!n")
    dshbYDto.group = "all"
    dshbYDto.sort.push("-ym:s:visits")

    return this.yandexService.findDashboards(dshbYDto);
  }


  // 5) визиты доля брендового и небрендового траффика
  @Get('dashboards/search-phrase')
  findDashboardsSearchPhrace(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase!n")
    dshbYDto.group = "all"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10

    return this.yandexService.findDashboards(dshbYDto);
  }


  // 6) посещаемость из поисковых систем
  @Get('dashboards/search-engine')
  findDashboardsSearchEngine(@Query() dshbYDto: FindDashboardsYandexDto) {

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngine")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 10

    return this.yandexService.findDashboardsByTime(dshbYDto);
  }

    // визиты по времени
    @Get('dashboards/visits')
    findDashboardsVisits(@Query() dshbYDto: FindDashboardsYandexDto) {
  
      dshbYDto.metrics.push("ym:s:visits")
      dshbYDto.group = "day"
      dshbYDto.sort.push("-ym:s:visits")
  
      return this.yandexService.findDashboardsByTime(dshbYDto);
    }
}
