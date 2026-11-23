const { resolve } = require("node:path");
const express = require("express");

const uploadPath = resolve(__dirname, "..", "..", "uploads");
fileRouteConfig = express.static(uploadPath);
module.exports = fileRouteConfig;
