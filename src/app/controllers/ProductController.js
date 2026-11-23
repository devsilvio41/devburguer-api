import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Categories.js";

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false /*strict: true*/ });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const { filename } = request.file;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });
    return response.status(201).json({ newProduct });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false /*strict: true*/ });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    let path; // 🔧 declarado antes do if, fora de qualquer bloco
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    try {
      const updateProduct = await Product.update(
        { name, price, category_id, path, offer },
        { where: { id } },
      );
      return response.status(200).json(updateProduct);
    } catch (err) {
      console.error(err.message);
      return response.status(400).json({ error: err.message });
    }
    // 🔧 removido o bloco duplicado que existia depois do try/catch (nunca era executado)
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    });
    return response.status(200).json({ products });
  }
}

export default new ProductController();
