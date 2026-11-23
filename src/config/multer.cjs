// const multer = require("multer");
// const { resolve } = require("node:path");

// module.exports = {
//   storage: multer.diskStorage({}),
//   destination: resolve(__dirname, "..", "..", "uploads"),
//   filename: (_request, file, callback) => {
//     const uniqueName = v4().concat("-${file.originalName}");
//     return callback(null, uniqueName);
//   },
// };

const multer = require("multer");
const { resolve } = require("node:path");
const { v4 } = require("uuid"); //

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"), // 🔧 movido para dentro
    filename: (_request, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`); // 🔧 crase + originalname (minúsculo)
      return callback(null, uniqueName);
    },
  }),
};
