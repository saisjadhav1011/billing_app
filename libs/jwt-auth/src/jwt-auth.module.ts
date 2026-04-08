import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    JwtModule.register({}),
    DatabaseModule,
  ],
  providers: [
    JwtService, 
    JwtAuthService, 
    AccessTokenStrategy, 
    RefreshTokenStrategy, 
    AccessTokenGuard, 
    RefreshTokenGuard
  ],
  exports: [
    JwtService, 
    JwtAuthService,
    AccessTokenStrategy, 
    RefreshTokenStrategy, 
  ],
})
export class JwtAuthModule {}
