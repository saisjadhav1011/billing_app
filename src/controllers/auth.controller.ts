import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "../dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Post('sign-up')
    @ApiOperation({ summary: 'User sign-up', description: 'Endpoint for user registration' })
    @ApiConflictResponse({ description: 'Email already exists' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiResponse({ status: 201, description: 'User signed up successfully' })
    @ApiBody({ type: SignUpDto })
    signUp(@Body() signUpDto: SignUpDto) {
        return { message: 'User signed up successfully' };
    }

    @Post('sign-in')
    @ApiOperation({ summary: 'User sign-in', description: 'Endpoint for user authentication' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiResponse({ status: 200, description: 'User signed in successfully' })
    @ApiBody({ type: SignUpDto })
    signIn(@Body() signInDto: SignUpDto) {
        return { message: 'User signed in successfully' };
    }
}