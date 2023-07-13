import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { PositionsTopvisorDto } from './dto/positions-topvisor.dto';
import { FindProjectsTopvisorDto } from './dto/find-projects-topvisor.dto';

@Controller('topvisor')
export class TopvisorController {
  constructor(private readonly topvisorService: TopvisorService) { }


  // получить список проектов
  @Get('projects')
  findProjects(@Query() findProjectsDto: FindProjectsTopvisorDto) {
    return this.topvisorService.findProjects(findProjectsDto);
  }

  // получить список проектов
  // @Get('project/:id')
  // findProject(@Param('id') id) {
  //   return this.topvisorService.findProject(id);
  // }


  // получить список позиций
  @Get('positions')
  checkPositions(@Query() positionsTopvisorDto: PositionsTopvisorDto) {
    return this.topvisorService.checkPositions(positionsTopvisorDto);
  }
}
