import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  if (String(process.env['USE_FASTIFY']) === 'false') {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env['PORT']);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Application is running with Express`);
  } else {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    await app.listen(process.env['PORT']);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Application is running with Fastify`);
  }
}

bootstrap();
