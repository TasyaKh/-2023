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
import { THeader } from 'src/topvisor/entities/headers.entity';
import { TKeywords } from 'src/topvisor/entities/keywords.entity';
import { TPositionsData } from 'src/topvisor/entities/positions-data.entity';
import { TRegion } from 'src/topvisor/entities/regions.entity';
import { TResult } from 'src/topvisor/entities/result.entity';
import { TSearcher } from 'src/topvisor/entities/searchers.entity';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, YandexService, TopvisorService],
  imports: [ScheduleModule.forRoot(),
  TypeOrmModule.forFeature([
    TopvisorProject, TDynamics, TTops, TPositionsSummary,
    YandexProject, YMetric, YData, YQuery,
    TRegion, TResult, TPositionsData, THeader, TSearcher, TKeywords])],


})
export class GeneralModule { }
