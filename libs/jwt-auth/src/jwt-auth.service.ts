import { UserRole } from '@app/database/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    generateAccessToken(input: { userId: number, email: string, role?: UserRole }) {
        console.log('Generating access token for user:', input);
        return this.jwtService.signAsync({
            id: input.userId,
            email: input.email,
            role: input.role || UserRole.Customer
        }, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '1d',
        });
    }

    generateRefreshToken(input: { userId: number, email: string, role?: UserRole }) {
        return this.jwtService.signAsync({
            id: input.userId,
            email: input.email,
            role: input.role || UserRole.Customer
        }, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });
    }

    generateResetPasswordToken(input: { userId: number, email: string }) {
        return this.jwtService.signAsync({
            id: input.userId,
            email: input.email
        }, {
            secret: this.configService.get<string>('JWT_RESET_SECRET'),
            expiresIn: '15m'
        });
    }

    async verifyResetPasswordToken(token: string) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_RESET_SECRET'),
            });
            return payload.id;
        } catch (err) {
            return null;
        }
    }

}
