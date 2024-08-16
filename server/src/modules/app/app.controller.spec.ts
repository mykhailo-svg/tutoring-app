import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Request } from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
          //@ts-ignore
          type: process.env.POSTGRES_TESTING_TYPE,
          host: process.env.POSTGRES_TESTING_HOST,
          port: Number(process.env.POSTGRES_TESTING_PORT),
          username: process.env.POSTGRES_TESTING_USER,
          password: process.env.POSTGRES_TESTING_PASSWORD,
          database: process.env.POSTGRES_TESTING_DB,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('should return "Hello World!"', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    console.log(response.body);
    console.log(response.status);
  });

  afterAll(async () => {
    await app.close();
  });
});
