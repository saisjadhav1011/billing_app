
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerEntity, UserEntity } from "../entities";

export class CustomerRepository extends Repository<CustomerEntity> {
    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepository: Repository<CustomerEntity>
    ) {
        super(customerRepository.target, customerRepository.manager, customerRepository.queryRunner);
    }
}