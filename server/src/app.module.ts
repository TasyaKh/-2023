import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YandexModule } from './yandex/yandex.module';
import { TopvisorModule } from './topvisor/topvisor.module';
import { GeneralModule } from './general/general.module';
import CONNECTION from './db.connection';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,

    }),

    TopvisorModule, YandexModule, GeneralModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
