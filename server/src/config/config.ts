import { ConfigService } from '@nestjs/config';

export function getConfig() {
  const configService = new ConfigService();

  return {
    app: {
      port: parseInt(configService.get('PORT')),
      globalPrefix: '/api',
    },
    client: {
      host: configService.get<string>('CLIENT_HOST'),
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
    ibbImagesStorage: {
      apiKey: configService.get<string>('IBB_IMAGES_STORAGE_API_KEY'),
    },
  };
}
