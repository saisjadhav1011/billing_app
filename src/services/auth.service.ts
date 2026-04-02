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
            data: user
        };
    }
    
    async singIn(input: SignInDto) {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user) {
            throw new NotFoundException('Invalid username or password');
        }

        const isPasswordMatches = await this.authHelper.isPasswordValid(input.password, user.password);

        if (!isPasswordMatches) {
            throw new ForbiddenException('Invalid user name or password');
        }

        const accessToken = await this.jwtAuthService.generateAccessToken({ userId: user.id, email: user.email });
        const refreshToken = await this.jwtAuthService.generateRefreshToken({ userId: user.id, email: user.email });

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
}