import { Module } from '@nestjs/common';
import { controllers } from './controllers';


@Module({
  imports: [],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
