import { ProductSortableFields, ProductUnit, SortDirection, UnitType } from "@app/database/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'Product Description', description: 'The description of the product', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 99.99, description: 'The price of the product' })
    @IsNumber()
    @Min(0)
    price!: number;

    @ApiProperty({ example: 10, description: 'The quantity of the product' })
    @IsNumber()
    @Min(0)
    quantity!: number;

    @ApiProperty({ example: 'Unit Type', description: 'The type of unit for the product' })
    @IsEnum(UnitType)
    unitType!: UnitType;

    @ApiProperty({ example: 'Product Unit', description: 'The unit for the product' })
    @IsEnum(ProductUnit)
    unit!: ProductUnit;

    @ApiProperty({ example: 18, description: 'The tax percentage for the product', required: false })
    @IsOptional()
    @IsNumber()
    tax?: number;

    @ApiProperty({ example: 'HSN Code', description: 'The HSN code for the product', required: false })
    @IsOptional()
    @IsString()
    hsnCode?: string;
}

export class GetProductsDto {
    @ApiProperty({ example: 'search term', description: 'Search term for product name or description', required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ example: '1', description: 'Page number for pagination', required: false })
    @IsOptional()
    @IsNumberString()
    page?: string = '1';

    @ApiProperty({ example: '10', description: 'Number of products per page for pagination', required: false })
    @IsOptional()
    @IsNumberString()
    limit?: string = '10';

    @ApiProperty({ example: 'created_at', description: 'Column to sort by', required: false, enum: ProductSortableFields })
    @IsOptional()
    @IsEnum(ProductSortableFields)
    sortBy?: ProductSortableFields = ProductSortableFields.CREATED_AT; // default column

    @ApiProperty({
        example: 'DESC',
        enum: SortDirection,
        required: false,
    })
    @IsOptional()
    @IsEnum(SortDirection)
    sortDirection?: SortDirection = SortDirection.DESC;
}

export class UpdateProductDto extends CreateProductDto {}