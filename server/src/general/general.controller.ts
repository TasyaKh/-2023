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
    const date1 = new Date(new Date().getTime() - 8_6400_000 * 60)
    const date2 = new Date()
    // оудалить проекты
    await this.generalService.clearProjectsYandex()
    // проверить проекты, добавить новые
    await this.generalService.ckeckYandexProjects()
    // сохранить данные графиков
    await this.generalService.updateYDashboards(date1, date2)
  }


  // CHECK and update EVERYWEEK
  @Cron('0 0 * * 0') // This cron expression runs the job every Sunday at midnight
  @ApiOperation({ summary: "Обновление топвизор проектов каждую неделю" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async updateEveryweek() {
    const date1 = new Date(new Date().getTime() - 8_6400_000 * 60)
    const date2 = new Date()
    // удалить проекты топвизора
    await this.generalService.clearProjectsTopvisor()
    // проверить проекты топвизора, добавить новые
    await this.generalService.ckeckProjectsTopvisor()
    // проверить проекты
    await this.generalService.fetchPositionsTopvisor(date1, date2)
  }
}
