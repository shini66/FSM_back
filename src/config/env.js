import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.VITE_PORT || 3000,
    JWT_SECRET: process.env.VITE_JWT_SECRET || 'some_secret_key',
}