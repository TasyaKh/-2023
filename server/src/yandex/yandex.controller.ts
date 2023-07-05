import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { CreateYandexDto } from './dto/create-yandex.dto';
import { UpdateYandexDto } from './dto/update-yandex.dto';

@Controller('yandex')
export class YandexController {
  constructor(private readonly yandexService: YandexService) {}

  @Post()
  create(@Body() createYandexDto: CreateYandexDto) {
    return this.yandexService.create(createYandexDto);
  }

  @Get()
  findAll() {
    return this.yandexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yandexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYandexDto: UpdateYandexDto) {
    return this.yandexService.update(+id, updateYandexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yandexService.remove(+id);
  }
}
