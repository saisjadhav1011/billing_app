import { CustomerRepository } from './customer.repository';
import { UserRepository } from './user.repository';

export const repositories = [UserRepository, CustomerRepository];

export * from './user.repository';
export * from './customer.repository';