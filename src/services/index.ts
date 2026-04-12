import { AuthService } from "./auth.service";
import { CustomersService } from "./customers.service";
import { ProductsService } from "./products.service";
import { UsersService } from "./users.service";

export const services = [ AuthService, ProductsService, UsersService, CustomersService, ];

export * from './auth.service';
export * from './products.service';
export * from './users.service';
export * from './customers.service';