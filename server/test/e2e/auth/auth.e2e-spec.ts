import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestUtils } from '../../utils/TestUtils';

const successfulUserPayload = {
  email: 'wyzdrykms@gmail.com',
  name: 'Test User',
  password: 'passwo_rD1a',
};

const ENDPOINTS = {
  register: '/auth/register',
};

describe('Auth E2E Tests', () => {
  const testUtils = new TestUtils();
  let app: INestApplication;

  beforeAll(async () => {
    await testUtils.setup();

    app = testUtils.testModule;

    await testUtils.resetDB();
  });

  describe('Register', () => {
    it('Should success (201)', async () => {
      const response = await request(app.getHttpServer())
        .post(ENDPOINTS.register)
        .send(successfulUserPayload)
        .expect(201);

      expect(Object.keys(response.body)).toStrictEqual(['user'].sort());
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('Should conflict (409)', async () => {
      await request(app.getHttpServer())
        .post(ENDPOINTS.register)
        .send(successfulUserPayload);

      return request(app.getHttpServer())
        .post(ENDPOINTS.register)
        .send(successfulUserPayload)
        .expect(409);
    });

    it('Should return bad password (400)', async () =>
      request(app.getHttpServer())
        .post(ENDPOINTS.register)
        .send({
          ...successfulUserPayload,
          password: 'asdawrwr1',
        } as typeof successfulUserPayload)
        .expect(400));

    it('Should return bad name (400)', async () =>
      request(app.getHttpServer())
        .post(ENDPOINTS.register)
        .send({
          ...successfulUserPayload,
          name: 'qew',
        } as typeof successfulUserPayload)
        .expect(400));
  });

  afterEach(async () => {
    await testUtils.resetDB();
  });

  afterAll(async () => {
    await testUtils.shutDown();
  });
});
