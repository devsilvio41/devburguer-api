// import jwt from "jsonwebtoken";
// import authConfig from "./../config/auth.js";

// const authMiddleware = (request, response, next) => {
//   const authHeader = request.headers.authorization;

//   if (!authHeader) {
//     return response.status(401).json({ error: "Token not provided!" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, authConfig.secret); // 🔧 sem callback — síncrono
//     request.userId = decoded.id; // disponibiliza o id nas próximas rotas
//     return next(); // 🔧 essencial no caminho de sucesso
//   } catch (error) {
//     return response.status(401).json({ error: "Token is invalid" });
//   }
// };

// export default authMiddleware;

// Código corrigido por Claude AI
