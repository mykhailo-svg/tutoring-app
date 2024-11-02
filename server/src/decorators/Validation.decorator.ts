import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';

export const Validation = () => {
  return applyDecorators(UsePipes(new ValidationPipe()));
};
