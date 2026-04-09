import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({ example: 'John Doe', description: 'Name of the customer' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the customer' })
    @IsString()
    @IsNotEmpty()
    email!: string;
}