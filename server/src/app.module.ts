import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YandexModule } from './yandex/yandex.module';
import { TopvisorModule } from './topvisor/topvisor.module';

@Module({
  imports: [TopvisorModule, YandexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
