import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.VITE_PORT || 3000,
    JWT_SECRET: process.env.VITE_JWT_SECRET || 'some_secret_key',
    MONGO_DB_URI: process.env.VITE_MONGO_URI || 'mongodb://localhost:27017',
    MONGO_DB_NAME: process.env.VITE_MONGO_DB_NAME || 'tu_db_name',
}