import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('Feedback app')
    .setDescription('')
    .setVersion('1.0')
    .addServer(
      'http://localhost:' + parseInt(`${process.env.PORT}`) + '/',
      'Local environment',
    )
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('Your API Tag')
    .build();

  app.enableCors();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(parseInt(`${process.env.PORT}`));
}
bootstrap();
