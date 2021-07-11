import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/logging.interceptor';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import ormConf from 'src/config/ormConf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(ormConf),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
