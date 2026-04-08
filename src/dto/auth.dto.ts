import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ description: 'User first name', example: 'John', required: true })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName!: string;

    @ApiProperty({ description: 'User last name', example: 'Doe', required: true })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName!: string;

    @ApiProperty({ description: 'User email', example: 'user@example.com', required: true })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({ description: 'User password', example: 'Password123!', required: true })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;
}

export class SignUpResponseDto {
    @ApiProperty({ description: 'Id of the registered user', example: 1 })
    @Expose()
    id!: number;

    @ApiProperty({ description: 'First name of the registered user', example: 'John' })
    @Expose()
    firstName!: string;

    @ApiProperty({ description: 'Last name of the registered user', example: 'Doe' })
    @Expose()
    lastName!: string;

    @ApiProperty({ description: 'Email of the registered user', example: 'user@example.com' })
    @Expose()
    email!: string;
}

export class SignInDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com', required: true })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({ description: 'User password', example: 'Password123!', required: true })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;
}

export class SignInResponseDto {
    @ApiProperty({ description: 'Access token for authentication', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @Expose()
    accessToken!: string;

    @ApiProperty({ description: 'Refresh token for obtaining new access tokens', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @Expose()
    refreshToken!: string;

    @ApiProperty({ description: 'ID of the authenticated user', example: 1 })
    @Expose()
    userId!: number;
}