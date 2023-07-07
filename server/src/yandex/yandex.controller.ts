import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { CreateYandexDto } from './dto/create-yandex.dto';
import { UpdateYandexDto } from './dto/update-yandex.dto';
import { FindProjectsYandexDto } from './dto/find-projects.dto';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';

@Controller('yandex')
export class YandexController {
  constructor(private readonly yandexService: YandexService) {}

// получить список проектов
@Get('projects')
findProjects(@Query()  findProjectsDto: FindProjectsDto) {
  return this.yandexService.findProjects(findProjectsDto);
}

}
