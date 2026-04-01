import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "../dto";

@ApiTags('auth/sign-up')
@Controller('auth/sign-up')
export class AuthController {
    @Post()
    @ApiOperation({ summary: 'User sign-up', description: 'Endpoint for user registration' })
    @ApiConflictResponse({ description: 'Email already exists' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiResponse({ status: 201, description: 'User signed up successfully' })
    @ApiBody({ type: SignUpDto })
    signUp(@Body() signUpDto: SignUpDto) {
        return { message: 'User signed up successfully' };
    }
}