import { CustomerRepository } from './customer.repository';
import { ProductRepository } from './product.repository';
import { UserRepository } from './user.repository';

export const repositories = [UserRepository, CustomerRepository, ProductRepository];

export * from './user.repository';
export * from './customer.repository';
export * from './product.repository';