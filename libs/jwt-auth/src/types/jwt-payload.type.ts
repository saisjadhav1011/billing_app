import { UserRole } from "@app/database/types";

export type JwtPayload = {
    sub: number;
    email: string;
    role: UserRole;
};