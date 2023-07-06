import { Injectable } from '@nestjs/common';
import { FindProjectsDto } from './dto/find-projects.dto';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';

@Injectable()
export class GeneralService {

  constructor(
    private readonly yandexService: YandexService,
    private readonly topvisorService: TopvisorService,) { }


  // найти проекты
  async findProjects(findProjectsDto: FindProjectsDto) {

    const yandexProjects = await this.yandexService.findProjects(findProjectsDto)
    const topvisorProjects = await this.topvisorService.findProjects(findProjectsDto)

    // console.log(yandexProjects)
    // console.log(topvisorProjects)

    const unitedProjects = this.uniteProjects(yandexProjects.counters, topvisorProjects.result)
    return unitedProjects;
  }


  // объединить проекты на основе сайта
  private uniteProjects(yandexProjects, topvisorProjects) {

    const unifiedProjects = [];

    yandexProjects.forEach(yandexProject => {

      topvisorProjects.forEach(topvisorProject => {
        // если сайт совпал
        if (yandexProject.site == topvisorProject.site) {
          unifiedProjects.push({ yandexProject: yandexProject, topvisorProject: topvisorProject })
        }
      });

    });

    return unifiedProjects
  }

}
