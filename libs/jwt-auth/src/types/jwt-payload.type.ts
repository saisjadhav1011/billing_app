import { UserRole } from "@app/database/types";

export type JwtPayload = {
    userId: number;
    email: string;
    role: UserRole
};