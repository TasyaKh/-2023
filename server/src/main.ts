import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // swagger документация----------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Yandex metric and topvisor API')
    .setDescription('Yandex metric and topvisor API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  // swagger документация----------------------------------------------------------

  
  // задать глобальный префикя для апи
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
