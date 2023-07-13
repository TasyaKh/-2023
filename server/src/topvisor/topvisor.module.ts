import { Module } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { TopvisorController } from './topvisor.controller';
import { TopvisorProject } from './entities/topvisor-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TDynamics } from './entities/dynamics.entity';
import { TTops } from './entities/tops.entity';
import { TPositionsSummary } from './entities/positions_summary.entity';

@Module({
  controllers: [TopvisorController],
  providers: [TopvisorService],
  imports: [TypeOrmModule.forFeature([TopvisorProject, TDynamics, TTops, TPositionsSummary])],

})
export class TopvisorModule {}
