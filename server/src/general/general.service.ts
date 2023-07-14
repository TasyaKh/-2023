import { Injectable } from '@nestjs/common';
import { FindProjectsDto } from './dto/find-projects.dto';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';
import { FindProjectsTopvisorDto } from 'src/topvisor/dto/find-projects-topvisor.dto';
import { date1D, date2D } from 'src/yandex/dashboards';

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




  // data checkers---------------------------------------------

  async ckeckProjects() {

    const tLastProject = await this.topvisorService.getTopvisorLastProject()
    const yLastProject = await this.yandexService.getYandexLastProject()

    let newYProjects = []
    let newTProjects = []


    const yPtojects = await this.yandexService.fetchProjects(new FindProjectsDto())

    // yandex если последний проект есть
    if (yLastProject && yLastProject.create_time) {

      const yDate = yLastProject.create_time

      // проверить проекты, появились ли новые у яндекса
      for (let i in yPtojects.counters) {
        let date = new Date(yPtojects.counters[i].create_time)

        if (date > yDate) {
          newYProjects.push(yPtojects.counters[i])
        }
      }
      // проекты не существуют
    } else {
      newYProjects = yPtojects.counters
    }


    const tPtojects = await this.topvisorService.fetchProjects(new FindProjectsTopvisorDto())

    // topvisor если последний проект есть
    if (tLastProject && tLastProject.date) {
      const tDate = tLastProject.date


      // проверить проекты, появились ли новые у topvisor
      for (let i in tPtojects.result) {
        let date = new Date(tPtojects.result[i].date)

        if (date > tDate) {
          newTProjects.push(tPtojects.result[i])
        }
      }

    }else {
      newTProjects = tPtojects.result
    }

    this.yandexService.saveProjectsDatabase(newYProjects, date1D, date2D)
    this.topvisorService.saveProjectsDatabase(newTProjects)
  }
}
