import { UserRole } from "@app/database/types";

export type JwtPayload = {
    id: number;
    email: string;
    role: UserRole;
};