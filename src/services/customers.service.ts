import { CustomerEntity, CustomerRepository, UserEntity } from "@app/database";
import { UserRole } from "@app/database/types";
import { AuthHelper } from "@app/helpers";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto, GetCustomersDto, UpdateCustomerDto } from "src/dto";
import { UsersService } from "./users.service";

@Injectable()
export class CustomersService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly authHelper: AuthHelper,
        private readonly usersService: UsersService,
    ) { }

    async createCustomer(customerData: CreateCustomerDto) {
        const { firstName, lastName, email, password, address, city, state, zip, country, gstNumber } = customerData;

        const queryRunner = this.customerRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingUser = await queryRunner.manager.findOne(UserEntity, { where: { email } });
            if (existingUser) {
                throw new Error(`User with email ${email} already exists`);
            }

            const passwordHash = await this.authHelper.encodePassword(password);

            const user = queryRunner.manager.create(UserEntity, {
                firstName,
                lastName,
                email,
                password: passwordHash,
                role: UserRole.Customer,
            });

            await queryRunner.manager.save(user);

            const customer = queryRunner.manager.create(CustomerEntity, {
                user,
                address,
                city,
                state,
                zip,
                country,
                gstNumber,
            });
            await queryRunner.manager.save(customer);

            await queryRunner.commitTransaction();
            return {
                message: 'Customer created successfully',
                data: customer
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: number, input: UpdateCustomerDto) {
        const customer = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });


        if (!customer) {
            throw new Error(`Customer with ID ${id} not found`);
        }

        // Update User info if provided
        if (input.firstName || input.lastName) {
            await this.usersService.update(customer.user.id, {
                firstName: input.firstName,
                lastName: input.lastName
            });
        }

        // // Update Customer info
        await this.customerRepository.update(id, {
            address: input.address,
            city: input.city,
            state: input.state,
            zip: input.zip,
            country: input.country,
            gstNumber: input.gstNumber
        });

        return {
            message: 'Customer updated',
            data: await this.findOne(id)
        };
    }

    async findOne(id: number) {
        const customer = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });
        if (!customer) {
            throw new Error(`Customer with ID ${id} not found`);
        }
        return {
            message: 'Customer by id',
            data: customer
        };
    }

    async findAll(input: GetCustomersDto) {
        const data = await this.customerRepository.getAllCustomers({
            page: parseInt(input.page || '1'),
            limit: parseInt(input.limit || '10'),
            search: input.search,
            sortDirection: input.sortDirection,
            sortBy: input.sortBy,
        });

        return {
            message: 'Customer List',
            data
        }
    }


    async blockUnblock(id: number, isBlocked: boolean) {
        await this.usersService.blockUnblock(id, isBlocked);
        return {
            message: 'Customer blocked or unblocked',
            data: true
        }
    }

    async delete(id: number) {
        await this.usersService.delete(id);
        return {
            message: 'Customer deleted',
            data: true
        }
    }
}