import { UserRepository } from "@app/database";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dto";
import { JwtAuthService } from "@app/jwt-auth";
import { AuthHelper } from "@app/helpers";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authHelper: AuthHelper,
        private readonly jwtAuthService: JwtAuthService,
    ) { }

    async signUp(input: SignUpDto) {
        const { firstName, lastName, email, password } = input;

        // 🔍 Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        // 🔐 Hash password
        const hashedPassword = await this.authHelper.encodePassword(password);

        // 👤 Create user
        const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);


        return {
            message: 'User Registered Successfully...',
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        };
    }

    async signIn(input: SignInDto) {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user) {
            throw new NotFoundException('Invalid username or password');
        }

        if(user.isBlocked || user.isDeleted) {
            throw new ForbiddenException('Your account has been blocked or deleted. Please contact support for assistance.');
        }

        const isPasswordMatches = await this.authHelper.isPasswordValid(input.password, user.password);

        if (!isPasswordMatches) {
            throw new ForbiddenException('Invalid user name or password');
        }

        const accessToken = await this.jwtAuthService.generateAccessToken({ userId: user.id, email: user.email, role: user.role });
        const refreshToken = await this.jwtAuthService.generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

        await this.updateRefreshToken(user.id, refreshToken);
        return {
            message: 'Signed in successfully',
            data: {
                accessToken,
                refreshToken,
                userId: user.id,
            }
        }
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.authHelper.encodePassword(refreshToken);
        await this.userRepository.update({ id: userId }, {
            refreshToken: hashedRefreshToken,
        });
    }

    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access denied');
        }

        // 🔐 Compare hashed refresh token
        const isMatch = await this.authHelper.isPasswordValid(
            refreshToken,
            user.refreshToken
        );

        if (!isMatch) {
            throw new ForbiddenException('Invalid refresh token');
        }

        // 🎟 Generate new tokens
        const accessToken = await this.jwtAuthService.generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        const newRefreshToken = await this.jwtAuthService.generateRefreshToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        // 🔄 Update refresh token
        await this.updateRefreshToken(user.id, newRefreshToken);

        return {
            message: 'Token refreshed successfully',
            data: {
                accessToken,
                refreshToken: newRefreshToken,
            },
        };
    }
}