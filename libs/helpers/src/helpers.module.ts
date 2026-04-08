import { Module } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { ResponseInterceptor } from './response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AuthHelper
  ],
  exports: [AuthHelper],
})
export class HelpersModule { }
