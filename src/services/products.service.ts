import { ProductRepository } from "@app/database";
import { Injectable } from "@nestjs/common";
import { CreateProductDto, GetProductsDto } from "src/dto";

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) { }

    async create(userId: number, input: CreateProductDto) {
        const product = this.productRepository.create({
            ...input,
            createdBy: { id: userId }, // relation
        });

        await this.productRepository.save(product);

        return {
            message: "Product created successfully",
            data: product,
        };
    }

    async findAll(input: GetProductsDto) {
        const data = await this.productRepository.getProducts(input);
        return {
            message: "Products retrieved successfully",
            data,
        };
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        return product;
    }

    async update(id: number, input: CreateProductDto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            return null;
        }

        Object.assign(product, input);
        await this.productRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            return null;
        }
        await this.productRepository.remove(product);
    }
}