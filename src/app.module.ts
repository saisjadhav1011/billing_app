import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { DatabaseModule } from '@app/database';
import { services } from './services';
import { JwtAuthModule } from '@app/jwt-auth';
import { HelpersModule } from '@app/helpers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),DatabaseModule, JwtAuthModule, HelpersModule,],
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule {}