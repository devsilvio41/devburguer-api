import "dotenv/config";
import app from "./app.js";
import "./database/index.js";

const port = process.env.PORT
app.listen(3001, () => console.log("Servidor Reiniciou, Porta 3001"));
