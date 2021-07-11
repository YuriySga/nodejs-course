import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  if (String(process.env['USE_FASTIFY']) === 'false') {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Nest swagger api')
      .setDescription('The nest API description')
      .setVersion('1.0')
      .addTag('nest')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(Number(process.env['PORT']));
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Application is running with Express`);
  } else {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    const config = new DocumentBuilder()
      .setTitle('Nest swagger api')
      .setDescription('The nest API description')
      .setVersion('1.0')
      .addTag('nest')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(Number(process.env['PORT']));
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Application is running with Fastify`);
  }
}

bootstrap();
