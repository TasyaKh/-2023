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



  // data checkers---------------------------------------------

  //   @Cron('0 0 * * *') // Cron expression for running at 00:00 every day
  @Cron('* * * * *')// Runs once a day at midnight (00:00)
  async checkProjects() {
    // Code to be executed every second
    console.log('Cron job executed every minute');
    // await this.generalService.ckeckProjects()
    // Call the desired method or function here
  }

}
