import { AccessTokenGuard, AdminGuard } from "@app/jwt-auth/guards";
import { Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateProductDto, GetProductsDto, UpdateProductDto } from "../../dto";

@ApiTags("Admin Products")
@ApiSecurity("access-token")
@Controller("admin/products")
@UseGuards(AccessTokenGuard, AdminGuard)
export class AdminProductsController {
    @ApiOperation({
        summary: 'Create Product',
        description: 'Create a new product (Admin only)',
    })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiBody({ type: CreateProductDto })
    @Post()
    create() {
    }

    @ApiOperation({
        summary: 'Get Products',
        description: 'Retrieve a list of all products (Admin only)',
    })
    @ApiQuery({ type: GetProductsDto})
    @ApiResponse({ status: 200, description: 'List of products retrieved successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Get()
    findAll() {
        
    }

    @ApiOperation({
        summary: 'Get Product by ID',
        description: 'Retrieve a product by its ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Get('/:id')
    findOne() {
    }

    @ApiOperation({
        summary: 'Update Product',
        description: 'Update an existing product (Admin only)',
    })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @Put('/:id')
    update() {
    }

    @ApiOperation({
        summary: 'Delete Product',
        description: 'Delete a product (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request' })
    @Delete('/:id')
    delete() {
    }


}