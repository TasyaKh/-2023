import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { CreateTopvisorDto } from './dto/create-topvisor.dto';
import { UpdateTopvisorDto } from './dto/update-topvisor.dto';
import { FindProjectsDto } from './dto/find-projects.dto';

@Controller('topvisor')
export class TopvisorController {
  constructor(private readonly topvisorService: TopvisorService) {}

  @Post()
  create(@Body() createTopvisorDto: CreateTopvisorDto) {
    return this.topvisorService.create(createTopvisorDto);
  }

  // получить список проектов
  @Get('projects')
  findProjects(@Body() findProjectsDto:FindProjectsDto) {
    return this.topvisorService.findProjects(findProjectsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topvisorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopvisorDto: UpdateTopvisorDto) {
    return this.topvisorService.update(+id, updateTopvisorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topvisorService.remove(+id);
  }
}
