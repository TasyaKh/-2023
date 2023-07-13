import { Module } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { YandexController } from './yandex.controller';
import { YandexProject } from './entities/yandex-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([YandexProject])],
  controllers: [YandexController],
  providers: [YandexService],
})
export class YandexModule {}
