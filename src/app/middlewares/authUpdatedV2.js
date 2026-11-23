// const authMiddleware = (request, response, next) => {
//   const authHeader = request.headers.authorization;

//   if (!authHeader) {
//     return response.status(401).json({ error: "Token not provided" });
//   }

//   const authToken = authHeader.split(" ")[1];

//   return next(); // 🔧 deixa a requisição seguir pra rota
// };

// export default authMiddleware;

// Código corrigido por Claude AI
