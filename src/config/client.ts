import { PrismaClient } from '../generated/prisma';
import 'dotenv/config';

// kết nối database
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

//nếu có kết nối rồi thì dùng kết nối cũ or tạo kết nối mới
export const prisma =
  globalForPrisma.prisma || new PrismaClient()
  log : process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma