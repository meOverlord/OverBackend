import { registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongo', () => ({
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 5432,
}));