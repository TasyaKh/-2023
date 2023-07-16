import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YandexProject } from 'src/yandex/entities/yandex-project.entity';
import { TopvisorProject } from 'src/topvisor/entities/topvisor-project.entity';
import { TDynamics } from 'src/topvisor/entities/dynamics.entity';
import { TPositionsSummary } from 'src/topvisor/entities/positions_summary.entity';
import { TTops } from 'src/topvisor/entities/tops.entity';
import { YData } from 'src/yandex/entities/data.entity';
import { YMetric } from 'src/yandex/entities/metrics.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { YQuery } from 'src/yandex/entities/query.entity';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, YandexService, TopvisorService],
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([YandexProject, TopvisorProject, TDynamics, TTops, TPositionsSummary, YMetric, YData, YQuery])],


})
export class GeneralModule {}
