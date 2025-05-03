import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GatewayModule } from '../gateway/gateway.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { DirectMessageModule } from '../direct-message/direct-message.module';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: 'tutoring-app-redis-service',
        port: 6379,
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CacheModule.registerAsync(RedisOptions),
    ServeStaticModule.forRoot({
      rootPath: (() => {
        console.log(join(__dirname, '..', 'uploads'));

        return join(__dirname, '..', 'uploads');
      })(), // Path to your uploads directory
      serveRoot: '/uploads', // URL path to serve the files
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    TokenModule,
    GatewayModule,
    DirectMessageModule,
  ],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
