
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities";
import { ProductSortableFields, SortDirection } from "../types";

export class ProductRepository extends Repository<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {
        super(productRepository.target, productRepository.manager, productRepository.queryRunner);
    }

    async getProducts(input: {
        search?: string;
        page?: string;
        limit?: string;
        sortBy?: ProductSortableFields;
        sortDirection?: SortDirection;
    }) {
        const {
            search,
            page = "1",
            limit = "10",
            sortBy = "createdAt",
            sortDirection = "DESC",
        } = input;
        const queryBuilder = this.createQueryBuilder('product');

        if(search){
            queryBuilder.where('product.name ILIKE :search', { search: `%${search}%` });
        }

        const sortField = sortBy ? `product.${sortBy}` : 'product.createdAt';
        queryBuilder.orderBy(sortField, sortDirection);

        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const skip = (pageNumber - 1) * pageSize;
        queryBuilder.skip(skip).take(pageSize);

        const [items, total] = await queryBuilder.getManyAndCount();

        console.log('Fetched products:', items, total);
        return {
            items,
            total,
        };
    }
}