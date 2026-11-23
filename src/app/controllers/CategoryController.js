import * as Yup from "yup";
import { Op } from "sequelize"; // 🔧 import necessário para o Op.ne
import Category from "../models/Categories.js";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false /*strict: true*/ });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { filename } = request.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
        path: filename,
      },
    });
    if (existingCategory) {
      return response.status(400).json({ error: "Category already exists!" });
    }

    const newCategory = await Category.create({
      name,
      path: filename, // 🔧 estava faltando salvar o path no create também
    });
    return response.status(201).json({ newCategory });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false /*strict: true*/ });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { id } = request.params;

    let path;
    if (request.file) {
      const { filename } = request.file;
      path = filename; // 🔧 estava "path = file" (variável inexistente)
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
        id: {
          [Op.ne]: id, // 🔧 exclui a própria categoria da checagem de duplicidade
        },
      },
    });
    if (existingCategory) {
      return response.status(400).json({ error: "Category already exists!" });
    }

    await Category.update(
      // 🔧 chamada que estava faltando — é ela que efetivamente atualiza o banco
      { name, path },
      { where: { id } }, // 🔧 where como 2º argumento (options), não misturado nos valores
    );

    const updatedCategory = await Category.findByPk(id); // 🔧 busca o registro já atualizado pra devolver
    return response.status(200).json(updatedCategory); // 🔧 status 200 (não 201, pois não é criação)
  }

  async index(_request, response) {
    const categories = await Category.findAll();
    return response.status(200).json(categories);
  }
}

export default new CategoryController();
