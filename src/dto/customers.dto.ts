import { CustomerSortFields, SortDirection } from "@app/database/types";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({ example: 'John', description: 'First name of the customer' })
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the customer' })
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the customer' })
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'Password@123' })
    @IsString()
    @MinLength(8)
    password!: string;

    @ApiProperty({ example: '123 Main Street' })
    @IsString()
    @IsNotEmpty()
    address!: string;

    @ApiProperty({ example: 'Nagpur' })
    @IsString()
    @IsNotEmpty()
    city!: string;

    @ApiProperty({ example: 'Maharashtra' })
    @IsString()
    @IsNotEmpty()
    state!: string;

    @ApiProperty({ example: '440001' })
    @IsString()
    @IsNotEmpty()
    zip!: string;

    @ApiProperty({ example: 'India' })
    @IsString()
    @IsNotEmpty()
    country!: string;

    @ApiProperty({ example: '27ABCDE1234F1Z5', required: false })
    @IsOptional()
    @IsString()
    gstNumber?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }

export class BlockUnblockCustomerDto {
    @ApiProperty({ example: true, description: 'true for block, false for unblock' })
    @IsBoolean()
    @IsNotEmpty()
    isBlocked!: boolean;
}

export class GetCustomersDto {

    @ApiProperty({ required: false, example: 'nagpur' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ required: false, example: 1 })
    @IsOptional()
    @IsNumberString()
    page?: string = '1';

    @ApiProperty({ required: false, example: 10 })
    @IsOptional()
    @IsNumberString()
    limit?: string = '10';

    @ApiProperty({
        required: false,
        enum: ['createdAt', 'city', 'state'],
        example: 'createdAt',
    })
    @IsOptional()
    @IsString()
    sortBy?: CustomerSortFields = CustomerSortFields.CREATED_AT;

    @ApiProperty({
        required: false,
        enum: SortDirection,
        example: 'DESC',
    })
    @IsOptional()
    @IsEnum(SortDirection)
    sortDirection?: SortDirection = SortDirection.DESC;
}

export class CustomerResponseDto {

    @ApiProperty({ example: 1 })
    @Expose()
    id!: number;

    @ApiProperty({ example: 'John' })
    @Expose()
    firstName!: string;

    @ApiProperty({ example: 'Doe' })
    @Expose()
    lastName!: string;

    @ApiProperty({ example: 'john@gmail.com' })
    @Expose()
    email!: string;

    @ApiProperty({ example: 'Nagpur' })
    @Expose()
    city!: string;

    @ApiProperty({ example: 'MH' })
    @Expose()
    state!: string;

    @ApiProperty({ example: 'India' })
    @Expose()
    country!: string;

    @ApiProperty({ example: '440001' })
    @Expose()
    zip!: string;

    @ApiProperty({ example: '27ABCDE1234F1Z5', required: false })
    @Expose()
    gstNumber?: string;

    @ApiProperty({ example: true })
    @Expose()
    isActive!: boolean;

    @ApiProperty({ example: '2026-04-10T10:00:00Z' })
    @Expose()
    createdAt!: Date;
}

export class CustomersListResponseDto {
    @ApiProperty({ description: 'Total number of customers', example: 1 })
    @Expose()
    total!: number;


    @ApiProperty({ description: 'List of customers', type: [CustomerResponseDto] })
    @Expose()
    items!: CustomerResponseDto[];
}