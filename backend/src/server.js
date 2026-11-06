import { app } from "./app.js";
import { config } from "./config/env.js";
import { inicializarBanco } from "./database/inicializar.js";

await inicializarBanco();

app.listen(config.port, () => {
  console.log(`API rodando em http://localhost:${config.port}/api`);
});