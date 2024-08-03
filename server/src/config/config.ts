import { ConfigService } from '@nestjs/config';

export function getConfig() {
  const configService = new ConfigService();

  return {
    app: {
      port: configService.get<number>('PORT'),
    },
    db: {
      port: configService.get<number>('POSTGRES_PORT'),
      type: configService.get<string>('POSTGRES_TYPE'),
      host: configService.get<string>('POSTGRES_HOST'),
      dbName: configService.get<string>('POSTGRES_DB'),
      schema: configService.get<string>('POSTGRES_SCHEMA'),
    },
    jwt: {
      secretKey: configService.get<string>('JWT_SECRET_KEY'),
      accessExpirationMinutes: configService.get<string>(
        'JWT_ACCESS_EXPIRATION_MINUTES',
      ),
      refreshExpirationDays: configService.get<string>(
        'JWT_REFRESH_EXPIRATION_DAYS',
      ),
    },
  };
}
