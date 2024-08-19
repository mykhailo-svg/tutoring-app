// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../src/modules/app/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     expect(true).toBe(true)
//   })

// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../src/modules/app/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     expect(true).toBe(true)
//   })

// });

import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/modules/app/app.service';
import { AppController } from '../src/modules/app/app.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Request } from 'supertest';
import { INestApplication, Inject, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { AuthModule } from '../src/modules/auth/auth.module';
import { UserController } from '../src/modules/user/user.controller';
import { UserModule } from '../src/modules/user/user.module';
import { UserService } from '../src/modules/user/user.service';
import { TokenService } from '../src/modules/token/token.service';
import { TokenModule } from '../src/modules/token/token.module';
import { TokenController } from '../src/modules/token/token.controller';
import { User } from '../src/modules/user/entities/user.entity';
import { Token } from '../src/modules/token/entities/token.entity';
import { AppModule } from '../src/modules/app/app.module';
import { Connection, DataSource, EntityManager, getConnection } from 'typeorm';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          //@ts-ignore
          type: process.env.POSTGRES_TESTING_TYPE,
          host: process.env.POSTGRES_TESTING_HOST,
          port: Number(process.env.POSTGRES_TESTING_PORT),
          username: process.env.POSTGRES_TESTING_USER,
          password: process.env.POSTGRES_TESTING_PASSWORD,
          database: process.env.POSTGRES_TESTING_DB,
          entities: [User, Token],
          synchronize: true,
        }),
        AppModule,
        UserModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');

    await app.init();
  });

  it('should return "Hello World!"', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'emaiasdfsssdsfsdfserwerasdsddassscdweadal@gmail.com',
        name: 'name sda',
        password: 'passwo_rD1a',
      })
      .expect(201);

    console.log(response.body);
    console.log(response.status);
  });

  // afterAll(async () => {
  //   await app.close();
  // });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { AppService } from '../src/modules/app/app.service';
// import { AppController } from '../src/modules/app/app.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { Request } from 'supertest';
// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import * as request from 'supertest';
// import { AuthController } from '../src/modules/auth/auth.controller';
// import { AuthService } from '../src/modules/auth/auth.service';
// import { AuthModule } from '../src/modules/auth/auth.module';
// import { UserController } from '../src/modules/user/user.controller';
// import { UserModule } from '../src/modules/user/user.module';
// import { UserService } from '../src/modules/user/user.service';
// import { TokenService } from '../src/modules/token/token.service';
// import { TokenModule } from '../src/modules/token/token.module';
// import { TokenController } from '../src/modules/token/token.controller';
// import { User } from '../src/modules/user/entities/user.entity';

// describe('AppController', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleMixture: TestingModule = await Test.createTestingModule({
//       controllers: [
//         AppController,
//         AuthController,
//         UserController,
//         TokenController,
//       ],
//       providers: [AppService, AuthService, UserService, TokenService, User],
//       imports: [
//         ConfigModule.forRoot({
//           envFilePath: '.env',
//         }),
//         TypeOrmModule.forRoot({
//           //@ts-ignore
//           type: process.env.POSTGRES_TESTING_TYPE,
//           host: process.env.POSTGRES_TESTING_HOST,
//           port: Number(process.env.POSTGRES_TESTING_PORT),
//           username: process.env.POSTGRES_TESTING_USER,
//           password: process.env.POSTGRES_TESTING_PASSWORD,
//           database: process.env.POSTGRES_TESTING_DB,
//           entities: ['dist/**/*.entity{.ts,.js}'],
//           synchronize: true,
//         }),
//         UserModule,
//         TokenModule,
//         AuthModule,
//       ],
//     })
//       .useMocker((token) => {
//         const results = ['test1', 'test2'];
//         if (token === UserService) {
//           return { findAll: jest.fn().mockResolvedValue(results) };
//         }
//         if (typeof token === 'function') {
//           const mockMetadata = moduleMocker.getMetadata(
//             token,
//           ) as MockFunctionMetadata<any, any>;
//           const Mock = moduleMocker.generateFromMetadata(mockMetadata);
//           return new Mock();
//         }
//       })
//       .compile();

//     app = moduleMixture.createNestApplication();
//     app.useGlobalPipes(new ValidationPipe());

//     await app.init();
//   });

//   it('should return "Hello World!"', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/auth/register')
//       .send({
//         email: 'emaiasdfssdfsdfserweradsddassscdweadal@gmail.com',
//         name: 'name sda',
//         password: 'passwo_rD1a',
//       })
//       .expect(200);

//     console.log(response.body);
//     console.log(response.status);
//   });

//   // afterAll(async () => {
//   //   await app.close();
//   // });
// });
