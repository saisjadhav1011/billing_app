
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerEntity } from "../entities";
import { SortDirection } from "../types";

export class CustomerRepository extends Repository<CustomerEntity> {
    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepository: Repository<CustomerEntity>
    ) {
        super(customerRepository.target, customerRepository.manager, customerRepository.queryRunner);
    }

    async getAllCustomers(input: {
        page: number;
        limit: number;
        search?: string;
        sortDirection?: SortDirection;
        sortBy?: string;
    }) {
        const { page, limit, search, sortDirection, sortBy } = input;

        const skip = (page - 1) * limit;

        const queryBuilder = this.customerRepository.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user');

        // 1. Search Logic (Filtering by City, State, or User Email/Name)
        if (search) {
            queryBuilder.andWhere(
                '(customer.city ILIKE :search OR customer.state ILIKE :search OR user.email ILIKE :search OR user.firstName ILIKE :search)',
                { search: `%${search}%` }
            );
        }

        // 2. Sorting Logic
        // We prefix with 'customer.' to ensure the DB knows which table to sort
        queryBuilder.orderBy(`customer.${sortBy}`, sortDirection as 'ASC' | 'DESC');

        // 3. Pagination Execution
        const [items, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            items,
            total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit)
        };
    }
}