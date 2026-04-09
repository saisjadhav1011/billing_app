import { AuthService } from "./auth.service";
import { ProductsService } from "./products.service";

export const services = [ AuthService, ProductsService ];

export * from './auth.service';
export * from './products.service';