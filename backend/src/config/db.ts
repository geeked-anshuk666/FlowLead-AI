import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDb = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL database.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
