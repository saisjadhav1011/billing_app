import { Module } from '@nestjs/common';
import { AuthHelper } from './auth.helper';

@Module({
  providers: [AuthHelper],
  exports: [AuthHelper],
})
export class HelpersModule { }
