import { Module } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { TopvisorController } from './topvisor.controller';

@Module({
  controllers: [TopvisorController],
  providers: [TopvisorService]
})
export class TopvisorModule {}
