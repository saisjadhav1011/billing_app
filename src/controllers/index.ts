import { adminControllers } from "./admin";
import { AuthController } from "./auth.controller";
import { HealthCheckController } from "./health-check.controller";

export const controllers = [
    HealthCheckController,
    AuthController,
    ...adminControllers,
]