import { Module } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { YandexController } from './yandex.controller';
import { YandexProject } from './entities/yandex-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YData } from './entities/data.entity';
import { YMetric } from './entities/metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YandexProject , YData ,YMetric])],
  controllers: [YandexController],
  providers: [YandexService],
})
export class YandexModule {}
