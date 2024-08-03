import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TokenController],
  exports: [TokenService],
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService],
})
export class TokenModule {}
