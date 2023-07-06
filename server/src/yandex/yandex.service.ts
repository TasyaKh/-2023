import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateYandexDto } from './dto/create-yandex.dto';
import { UpdateYandexDto } from './dto/update-yandex.dto';
import { FindProjectsYandexDto } from './dto/find-projects.dto';
import { axiosYandexInstance } from 'src/axios-instance';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';

@Injectable()
export class YandexService {

  async findProjects(findProjectsDto:FindProjectsDto) {

    let res = null

    const params = {
     ...findProjectsDto
    }

    await axiosYandexInstance.get("/management/v1/counters", {params:params}).then((response) => {
      res = response.data
    })

    if (res.errors){
      throw new HttpException(res.errors, HttpStatus.BAD_REQUEST, { cause: new Error(res.errors) });
    }
    
    return res
  }


  findOne(id: number) {
    return `This action returns a #${id} yandex`;
  }

  update(id: number, updateYandexDto: UpdateYandexDto) {
    return `This action updates a #${id} yandex`;
  }

  remove(id: number) {
    return `This action removes a #${id} yandex`;
  }
}
