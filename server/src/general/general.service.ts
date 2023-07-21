import { Injectable } from '@nestjs/common';
import { FindProjectsDto } from './dto/find-projects.dto';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';
import { FindProjectsTopvisorDto } from 'src/topvisor/dto/find-projects-topvisor.dto';
import { date1D, date2D } from 'src/yandex/dashboards';
import { PositionsTopvisorDto } from 'src/topvisor/dto/positions-topvisor.dto';

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

  async ckeckYandexProjects() {

    const yLastProject = await this.yandexService.getYandexLastProject()

    let newYProjects = []

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

    await this.yandexService.saveProjectsDatabase(newYProjects)
  }

  async ckeckProjectsTopvisor() {

    const tLastProject = await this.topvisorService.getTopvisorLastProject()
    let newTProjects = []

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

    } else {
      newTProjects = tPtojects.result
    }

    await this.topvisorService.saveProjectsDatabase(newTProjects)
  }



  async clearProjectsYandex() {
    await this.yandexService.clearProjects()
  }

  async clearProjectsTopvisor() {
    await this.topvisorService.clearProjects()
  }

  async fetchPositionsTopvisor(date1: Date, date2: Date) {

    const tProjects = await this.topvisorService.findProjects(new FindProjectsTopvisorDto())

    for (let i in tProjects) {
      const project = tProjects[i]
      const ptDto = new PositionsTopvisorDto()

      ptDto.project_id = project.id
      ptDto.regions_indexes = project.regions
      ptDto.date1 = date1
      ptDto.date2 = date2

      const positions = await this.topvisorService.fetchPositions(ptDto)
        .catch((err) => {
          console.log(err)
        })

      const sadevPositions = await this.topvisorService.savePositionDatabase(positions.result)
        .catch((err) => {
          console.log(err)
        })

    }

  }

  // updateProjects
  async updateYDashboards(date1: Date, date2: Date) {
    const yProjects = await this.yandexService.findProjects(new FindProjectsDto())

    // пройтись по вем проектам в бд
    for (let i in yProjects) {
      const id = yProjects[i].id

      // обновить даные для нудных
      const dashboards = await this.yandexService.fetchAndSaveGraphics(id, date1, date2)
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
