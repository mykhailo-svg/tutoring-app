import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { getConfig } from './config';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const config = getConfig();

  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix(config.app.globalPrefix);

  app.useWebSocketAdapter(new WsAdapter(app));
  const options = new DocumentBuilder()
    .setTitle('Feedback app')
    .setDescription('')
    .setVersion('1.0')
    .addServer(
      'http://localhost:' + parseInt(`${process.env.PORT}`) + '/',
      'Local environment',
    )
    .addTag('Your API Tag')
    .build();

  // Cors
  app.use(
    cors({
      credentials: true,
      origin: [config.client.host],
      exposedHeaders: ['*'],
    }),
  );

  // Cookies
  app.use(cookieParser());

  // Swagger
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(parseInt(`${process.env.PORT}`));
}
bootstrap();
