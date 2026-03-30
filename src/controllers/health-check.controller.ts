import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
    @Get()
    @ApiOperation({ summary: 'Check application health status' })
    @ApiResponse({ status: 200, description: 'Application is healthy', schema: { example: { status: 'ok', timestamp: '2026-03-20T10:00:00.000Z', }, }, })
    check() {
        return { status: 'ok', timestamp: new Date(), };
    }
}