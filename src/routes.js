import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

import multerConfig from "./config/multer.cjs";
import authMiddleware from "./app/middlewares/auth.js";
import adminMiddleware from "./app/middlewares/admin.js";

const routes = new Router();
const upload = multer(multerConfig);

/* ====================================================
   ROTAS PÚBLICAS (Sem autenticação / Health Check)
==================================================== */

// Rota raiz para o Health Check do Easypanel (NÃO PODE TER AUTH)
routes.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", message: "DevBurger API ativa!" });
});

// Cadastro e Login
routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

// Listagem de produtos e categorias (Vitrine pública)
routes.get("/products", ProductController.index);
routes.get("/categories", CategoryController.index);

/* ====================================================
   MIDDLEWARE DE AUTENTICAÇÃO
   (Daqui para baixo, exige token JWT)
==================================================== */
routes.use(authMiddleware);

// Pedidos e Pagamento
routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.post("/create-payment-intent", CreatePaymentIntentController.store);

/* ====================================================
   ROTAS EXCLUSIVAS DE ADMINISTRADOR
==================================================== */

// Admin - Produtos
routes.post(
  "/products",
  adminMiddleware,
  upload.single("file"),
  ProductController.store,
);
routes.put(
  "/products/:id",
  adminMiddleware,
  upload.single("file"),
  ProductController.update,
);

// Admin - Categorias
routes.post(
  "/categories",
  adminMiddleware,
  upload.single("file"),
  CategoryController.store,
);
routes.put(
  "/categories/:id",
  adminMiddleware,
  upload.single("file"),
  CategoryController.update,
);

// Admin - Pedidos
routes.put("/orders/:id", adminMiddleware, OrderController.update);

export default routes;
