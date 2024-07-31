import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { EntityManager } from 'typeorm';

describe('Serv', () => {
  let app: INestApplication;

  async function clearDatabase(): Promise<void> {
    const entityManager = app.get<EntityManager>(EntityManager);
    const tableNames = entityManager.connection.entityMetadatas
      .map((entity) => entity.tableName)
      .join(', ');

    await entityManager.query(
      `truncate ${tableNames} restart identity cascade;`,
    );
  }

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [TypeOrmModule],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  it.todo('should pass');

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await app.close();
  });
});
