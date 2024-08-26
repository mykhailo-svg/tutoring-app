import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/modules/app/app.module';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { Token } from '../../src/modules/token/entities/token.entity';
import { User } from '../../src/modules/user/entities/user.entity';
import { UserModule } from '../../src/modules/user/user.module';
import { Repository } from 'typeorm';

export class TestUtils {
  private testingModule: INestApplication | null;
  private tokenRepo: Repository<Token>;
  private userRepo: Repository<User>;

  constructor() {}

  async setup() {
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

    this.tokenRepo = await moduleFixture.get('TokenRepository');
    this.userRepo = await moduleFixture.get('UserRepository');
    this.testingModule = moduleFixture.createNestApplication();

    await this.testingModule.init();
  }

  async shutDown() {
    await this.testingModule.close();
  }

  async resetDB() {
    await this.tokenRepo.query('DELETE FROM "token";');
    await this.userRepo.query('DELETE FROM "user";');
  }

  get testModule() {
    return this.testingModule;
  }
}
