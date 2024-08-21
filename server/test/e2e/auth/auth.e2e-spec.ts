import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../../../src/modules/auth/auth.module';
import { UserModule } from '../../../src/modules/user/user.module';
import { User } from '../../../src/modules/user/entities/user.entity';
import { Token } from '../../../src/modules/token/entities/token.entity';
import { AppModule } from '../../../src/modules/app/app.module';
import { createConnection, getConnection, Repository } from 'typeorm';

const successfulUserPayload = {
  email: 'wyzdrykms@gmail.com',
  name: 'Test User',
  password: 'passwo_rD1a',
};

describe('AppController', () => {
  let app: INestApplication;

  let tokens = { accessToken: '', refreshToken: '' };
  let userRepo: Repository<User>;
  let tokenRepo: Repository<Token>;

  beforeAll(async () => {
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
    // tokenRepo = await moduleFixture.get(Token);
    // userRepo = await moduleFixture.get(User);
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  describe('Register', () => {
    it('Should success (201)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(successfulUserPayload)
        .expect(201);

      expect(Boolean(response.body.tokens.accessToken)).toBe(true);
      expect(Boolean(response.body.tokens.refreshToken)).toBe(true);
    });

    it('Should conflict (409)', async () =>
      request(app.getHttpServer())
        .post('/auth/register')
        .send(successfulUserPayload)
        .expect(409));

    it('Should return bad password (400)', async () =>
      request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...successfulUserPayload,
          password: 'asdawrwr1',
        } as typeof successfulUserPayload)
        .expect(400));

    it('Should return bad name (400)', async () =>
      request(app.getHttpServer())
        .post('/auth/register')
        .send({
          ...successfulUserPayload,
          name: 'qew',
        } as typeof successfulUserPayload)
        .expect(400));
  });

  afterAll(async () => {
    // const userRep = await modf;

    // await tokenRepo.query('DELETE FROM "token"');
    // await userRepo.query('DELETE FROM "user"');
    const dbConnection = await createConnection({
      //@ts-ignore
      type: 'postgres',
      host: 'postgres-testing',
      port: 5437,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Token],
      synchronize: true,
    });
    if (!dbConnection.isConnected) await dbConnection.connect();

    const entities = dbConnection.entityMetadatas;
    const tableNames = entities
      .map((entity) => `"${entity.tableName}"`)
      .join(', ');

    await dbConnection.query(`TRUNCATE ${tableNames} CASCADE;`);
    console.log('[TEST DATABASE]: Clean');
  });
  afterAll(async () => {
    await app.close();
  });
});
