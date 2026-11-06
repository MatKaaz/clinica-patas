import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3001),
  databaseUrl: process.env.DATABASE_URL ?? "file:local.db",
  databaseAuthToken: process.env.DATABASE_AUTH_TOKEN || undefined,
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((origem) => origem.trim()),
};