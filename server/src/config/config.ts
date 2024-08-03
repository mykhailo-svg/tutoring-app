import { ConfigService } from '@nestjs/config';

export function getConfig() {
  const configService = new ConfigService();

  return {
    app: {
      port: parseInt(configService.get('PORT')),
    },
    db: {
      port: parseInt(configService.get('POSTGRES_PORT')),
      type: configService.get<string>('POSTGRES_TYPE'),
      host: configService.get<string>('POSTGRES_HOST'),
      dbName: configService.get<string>('POSTGRES_DB'),
      schema: configService.get<string>('POSTGRES_SCHEMA'),
    },
    jwt: {
      secretKey: configService.get<string>('JWT_SECRET_KEY'),
      accessExpirationMinutes: parseInt(
        configService.get<string>('JWT_ACCESS_EXPIRATION_MINUTES'),
      ),
      refreshExpirationDays: parseInt(
        configService.get('JWT_REFRESH_EXPIRATION_DAYS'),
      ),
    },
  };
}
