import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  try {
    const prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
    });
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
    return prisma;
  } catch (e) {
    const message = e instanceof Error ? e.message : "UNKNOWN";
    throw new Error(`PrismaClient init failed: ${message}`);
  }
}

