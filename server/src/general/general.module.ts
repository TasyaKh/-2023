import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { YandexService } from 'src/yandex/yandex.service';
import { TopvisorService } from 'src/topvisor/topvisor.service';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, YandexService, TopvisorService]
})
export class GeneralModule {}
