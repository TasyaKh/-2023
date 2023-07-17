import { Module } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { TopvisorController } from './topvisor.controller';
import { TopvisorProject } from './entities/topvisor-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TDynamics } from './entities/dynamics.entity';
import { TTops } from './entities/tops.entity';
import { TPositionsSummary } from './entities/positions_summary.entity';
import { TRegion } from './entities/regions.entity';
import { TResult } from './entities/result.entity';
import { TPositionsData } from './entities/positions-data.entity';
import { THeader } from './entities/headers.entity';
import { TSearcher } from './entities/searchers.entity';
import { TKeywords } from './entities/keywords.entity';

@Module({
  controllers: [TopvisorController],
  providers: [TopvisorService],
  imports: [TypeOrmModule.forFeature([TopvisorProject, TDynamics, TTops, TPositionsSummary,
  TRegion, TResult, TPositionsData, THeader, TSearcher, TKeywords])],

})
export class TopvisorModule {}
