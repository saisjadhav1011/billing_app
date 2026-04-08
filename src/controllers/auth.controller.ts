import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto } from "../dto";
import { AuthService } from "../services";
import { RefreshTokenGuard } from "@app/jwt-auth/guards";
import { GetCurrentUser, GetCurrentUserId } from "@app/jwt-auth/decorators";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    @ApiOperation({ summary: 'User sign-up', description: 'Endpoint for user registration' })
    @ApiConflictResponse({ description: 'Email already exists' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiResponse({ status: 201, description: 'User signed up successfully', type: SignUpResponseDto })
    @ApiBody({ type: SignUpDto })
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('sign-in')
    @ApiOperation({ summary: 'User sign-in', description: 'Endpoint for user authentication' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiBadRequestResponse({ description: 'Invalid username or password' })
    @ApiResponse({ status: 200, description: 'User signed in successfully', type: SignInResponseDto })
    @ApiBody({ type: SignInDto })
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refreshtoken')
    @ApiBearerAuth('refresh-token')
    @ApiOperation({ summary: 'Refresh access token', description: 'Endpoint to refresh access token using a valid refresh token' })
    @ApiBadRequestResponse({ description: 'Invalid refresh token' })
    @ApiResponse({ status: 200, description: 'Access token refreshed successfully', type: SignInResponseDto })

    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(userId, refreshToken);
    }
}