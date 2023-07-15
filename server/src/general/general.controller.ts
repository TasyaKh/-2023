import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GeneralService } from './general.service';
import { FindProjectsDto } from './dto/find-projects.dto';
import { Cron } from '@nestjs/schedule';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  @Get("projects")
  async findProjects(@Query() findProjectsDto: FindProjectsDto) {
    return this.generalService.findProjects(findProjectsDto);
  }


  @Get("update-db")
  async updateDB() {
    //  очистить проекты
    await this.generalService.clearProjectsYandex()
    // бновить дашборы яндекса
    // await this.generalService.updateYDashboards()
    // проверить проекты
    await this.generalService.ckeckProjects()
  }


  // data checkers---------------------------------------------

  // CHECK and update EVERYDAY  
  @Cron('0 0 * * *') // Cron expression for running at 00:00 every day
  // @Cron('* * * * *')// Runs once a day at midnight (00:00)
  async updateEveryday() {

    // бновить дашборы яндекса
    // await this.generalService.updateYDashboards()
    await this.generalService.clearProjectsYandex()
    // проверить проекты
    await this.generalService.ckeckProjects()
  }

}
