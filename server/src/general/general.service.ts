import { Injectable } from '@nestjs/common';
import { FindProjectsDto } from './dto/find-projects.dto';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';
import { FindProjectsTopvisorDto } from 'src/topvisor/dto/find-projects-topvisor.dto';

@Injectable()
export class GeneralService {

  constructor(
    private readonly yandexService: YandexService,
    private readonly topvisorService: TopvisorService,) { }


  // найти проекты
  async findProjects(findProjectsDto: FindProjectsDto) {

    const yandexProjects = await this.yandexService.findProjects(findProjectsDto)

    // topvisor
    let findProjectsTopvisorDto = new FindProjectsTopvisorDto()
    findProjectsTopvisorDto.limit = findProjectsDto.limit
    findProjectsTopvisorDto.offset = findProjectsDto.offset
    findProjectsTopvisorDto.search_string = findProjectsDto.search_string
    findProjectsTopvisorDto.orders = findProjectsDto.orders

    const topvisorProjects = await this.topvisorService.findProjects(findProjectsTopvisorDto)

    // console.log(yandexProjects)
    // console.log(topvisorProjects)

    const unitedProjects = this.uniteProjects(yandexProjects, topvisorProjects)
    return unitedProjects;
  }


  // объединить проекты на основе сайта
  private uniteProjects(yandexProjects, topvisorProjects) {

    const unifiedProjects = [];


    topvisorProjects.forEach(topvisorProjects => {

      yandexProjects.forEach(yandexProjects => {
        // если сайт совпал
        if (topvisorProjects.site == yandexProjects.site) {
          unifiedProjects.push({ yandexProject: yandexProjects, topvisorProject: topvisorProjects })
        }
      });

    });

    return unifiedProjects
  }

}
