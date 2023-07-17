import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { GeneralService } from './general.service';
import { FindProjectsDto } from './dto/find-projects.dto';
import { Cron } from '@nestjs/schedule';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('general')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  @Get("projects")
  @ApiOperation({ summary: "Получение списка проктов яндекса и топвизора" })
  async findProjects(@Query() findProjectsDto: FindProjectsDto) {
    return this.generalService.findProjects(findProjectsDto);
  }


  @Get("update-db")
  @ApiOperation({ summary: "Очистить проекты" })
  async updateDB() {
    //  очистить проекты
    this.updateEveryday()
    this.updateEveryweek()

  }


  // data checkers---------------------------------------------

  // CHECK and update EVERYDAY  
  @Cron('0 0 * * *') // Cron expression for running at 00:00 every day
  @ApiOperation({ summary: "Обновление яндекс проектов каждый день" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "UNAUTHORIZED" })
  async updateEveryday() {
    // обновить дашборы яндекса
    // await this.generalService.updateYDashboards()
    await this.generalService.clearProjectsYandex()
    // проверить проекты
    await this.generalService.ckeckYandexProjects()
  }


  // CHECK and update EVERYWEEK
  @Cron('0 0 * * 0') // This cron expression runs the job every Sunday at midnight
  @ApiOperation({ summary: "Обновление топвизор проектов каждую неделю" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async updateEveryweek() {
    // обновить дашборы яндекса
    // await this.generalService.updateYDashboards()
    await this.generalService.clearProjectsTopvisor()
    await this.generalService.ckeckProjectsTopvisor()
    // проверить проекты
    await this.generalService.fetchPositionsTopvisor()
  }
}
