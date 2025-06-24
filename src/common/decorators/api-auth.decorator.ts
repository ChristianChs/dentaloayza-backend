import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiBearerAuth(),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
