import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';

@Controller('topvisor')
export class TopvisorController {
  constructor(private readonly topvisorService: TopvisorService) {}


  // получить список проектов
  @Get('projects')
  findProjects(@Body() findProjectsDto:FindProjectsDto) {
    return this.topvisorService.findProjects(findProjectsDto);
  }
}
