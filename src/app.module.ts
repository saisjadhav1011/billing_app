import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}