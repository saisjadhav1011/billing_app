import { AccessTokenGuard, AdminGuard } from "@app/jwt-auth/guards";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateProductDto, GetProductsDto, ProductListResponseDto, ProductResponseDto, UpdateProductDto } from "../../dto";
import { ProductsService } from "../../services";
import { GetCurrentUserId } from "@app/jwt-auth/decorators";

@ApiTags("Admin Products")
@ApiSecurity("access-token")
@Controller("admin/products")
@UseGuards(AccessTokenGuard, AdminGuard)
export class AdminProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @ApiOperation({
        summary: 'Create Product',
        description: 'Create a new product (Admin only)',
    })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiBody({ type: CreateProductDto })
    @Post()
    create(@GetCurrentUserId() userId: number, @Body() input: CreateProductDto) {
        return this.productsService.create(userId, input);
    }

    @ApiOperation({
        summary: 'Get Products',
        description: 'Retrieve a list of all products (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'List of products retrieved successfully', type: ProductListResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Get()
    findAll(@Query() input: GetProductsDto) {
        return this.productsService.findAll(input);
    }

    @ApiOperation({
        summary: 'Get Product by ID',
        description: 'Retrieve a product by its ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: ProductResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Update Product',
        description: 'Update an existing product (Admin only)',
    })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @Put('/:id')
    update(@Param('id') id: number, @Body() input: UpdateProductDto) {
        return this.productsService.update(id, input);
    }

    @ApiOperation({
        summary: 'Delete Product',
        description: 'Delete a product (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.productsService.remove(id);
    }
}