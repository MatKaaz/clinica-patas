import { createClient } from "@libsql/client";
import { config } from "../config/env.js";

export const db = createClient({
  url: config.databaseUrl,
  authToken: config.databaseAuthToken,
});