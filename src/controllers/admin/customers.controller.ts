import { AccessTokenGuard, AdminGuard } from "@app/jwt-auth/guards";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { BlockUnblockCustomerDto, CreateCustomerDto, CustomerResponseDto, CustomersListResponseDto, GetCustomersDto, UpdateCustomerDto } from "../../dto";
import { CustomersService } from "src/services";


@ApiTags("Admin Customers")
@ApiSecurity("access-token")
@Controller('admin/customers')
@UseGuards(AccessTokenGuard, AdminGuard)
export class AdminCustomersController {

    constructor(private readonly customerService: CustomersService){}

    @ApiOperation({
        summary: 'Create Customer',
        description: 'Create a new customer (Admin only)',
    })
    @ApiBody({ type: CreateCustomerDto })
    @ApiResponse({ status: 200, description: 'Customer created successfully', type:CustomerResponseDto})
    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @ApiOperation({
        summary: 'List Customers',
        description: 'Get a list of all customers (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'List of customers retrieved successfully', type: CustomersListResponseDto })
    @Get()
    findAll(@Query() query: GetCustomersDto) {
        return this.customerService.findAll(query);
    }

    @ApiOperation({
        summary: 'Get Customer',
        description: 'Get a customer by ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Customer retrieved successfully', type: CustomerResponseDto })
    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.customerService.findOne(id);
    }

    @ApiOperation({
        summary: 'Update Customer',
        description: 'Update a customer by ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Customer updated successfully', type: CustomerResponseDto })
    @Put('/:id')
    update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerService.update(id, updateCustomerDto);
    }

    @ApiOperation({
        summary: 'Block/Unblock Customer',
        description: 'Block or unblock a customer by ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Customer blocked/unblocked successfully', type: Boolean })
    @Put('/:id/block')
    blockUnblock(@Param('id') id: number, @Body() blockUnblockCustomerDto: BlockUnblockCustomerDto) {
       return this.customerService.blockUnblock(id, blockUnblockCustomerDto.isBlocked);
    }

    @ApiOperation({
        summary: 'Delete Customer',
        description: 'Delete a customer by ID (Admin only)',
    })
    @ApiResponse({ status: 200, description: 'Customer deleted successfully', type: Boolean })
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.customerService.delete(id);[]
    }
}