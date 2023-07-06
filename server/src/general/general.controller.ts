import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GeneralService } from './general.service';
import { FindProjectsDto } from './dto/find-projects.dto';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get("projects")
  findProjects(@Query() findProjectsDto:FindProjectsDto) {
    return this.generalService.findProjects(findProjectsDto);
  }

}
