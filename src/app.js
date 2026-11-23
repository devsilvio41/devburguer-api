import express from "express";
import routes from "./routes.js";
import fileRouteConfig from "./config/fileRoutes.cjs";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); // 🔧 precisa vir ANTES das rotas
app.use(express.urlencoded({ extended: true }));

// 🔧 rotas públicas de arquivo ANTES do router protegido
app.use("/producty-file", fileRouteConfig);
app.use("/category-file", fileRouteConfig);

app.use(routes);
app.use("/producty-file", fileRouteConfig);
app.use("/category-file", fileRouteConfig);

export default app;
