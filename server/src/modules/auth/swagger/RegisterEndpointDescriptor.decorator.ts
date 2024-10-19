import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const RegisterEndpointDescriptor = () => {
  return applyDecorators(
    ApiResponse({
      schema: {
        default: {
          tokens: {
            accessToken: 'token',
            refreshToken: 'token',
          },
          user: {
            id: 1,
            password: 'hashed password',
            email: 'email',
            name: 'name',
            isEmailVerified: false,
          },
        },
      },
      status: HttpStatus.OK,
    }),
    ApiResponse({
      schema: {
        default: {
          message: 'User already exists!',
          error: 'Conflict',
          statusCode: HttpStatus.CONFLICT,
        },
      },
      status: HttpStatus.CONFLICT,
    }),
    ApiResponse({
      schema: {
        default: {
          message: 'Bad request!',
          error: 'Bad request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
      status: HttpStatus.BAD_REQUEST,
    }),
  );
};
