import { Injectable } from '@nestjs/common';
import { CreateYandexDto } from './dto/create-yandex.dto';
import { UpdateYandexDto } from './dto/update-yandex.dto';

@Injectable()
export class YandexService {
  create(createYandexDto: CreateYandexDto) {
    return 'This action adds a new yandex';
  }

  findAll() {
    return `This action returns all yandex`;
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
