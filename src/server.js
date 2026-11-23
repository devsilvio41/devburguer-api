import "dotenv/config";
import app from "./app.js";
import "./database/index.js";

// No seu server.js ou app.js:
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🍔 DevBurger rodando na porta ${PORT}`);
});
