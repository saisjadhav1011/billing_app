import { AccessTokenGuard, AdminGuard } from "@app/jwt-auth/guards";
import { Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateCustomerDto } from "../../dto";


@ApiTags("Admin Customers")
@ApiSecurity("access-token")
@Controller('admin/customers')
@UseGuards(AccessTokenGuard, AdminGuard)
export class AdminCustomersController {
    
    @ApiOperation({
        summary: 'Create Customer',
        description: 'Create a new customer (Admin only)',
    })
    @ApiBody({ type: CreateCustomerDto })
    @Post()
    create() {
        return "Create customer (Admin only)";
    }

    @ApiOperation({
        summary: 'List Customers',
        description: 'Get a list of all customers (Admin only)',
    })
    @Get()
    findAll() {
        return "List of customers (Admin only)";
    }

    @ApiOperation({
        summary: 'Get Customer',
        description: 'Get a customer by ID (Admin only)',
    })
    @Get('/:id')
    findOne(@Param('id') id: number) {
        return `Customer with ID ${id} (Admin only)`;
    }

    @ApiOperation({
        summary: 'Update Customer',
        description: 'Update a customer by ID (Admin only)',
    })
    @Put('/:id')
    update(@Param('id') id: number) {
        return `Update customer with ID ${id} (Admin only)`;
    }

    @ApiOperation({
        summary: 'Delete Customer',
        description: 'Delete a customer by ID (Admin only)',
    })
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return `Delete customer with ID ${id} (Admin only)`;
    }
}