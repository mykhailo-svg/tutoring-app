import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards';

export const Auth = () => {
  return applyDecorators(UseGuards(AuthGuard));
};
