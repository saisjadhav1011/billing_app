
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities";

export class ProductRepository extends Repository<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {
        super(productRepository.target, productRepository.manager, productRepository.queryRunner);
    }
}