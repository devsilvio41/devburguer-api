import { v4 } from "uuid";
import User from "../models/User.js";
import * as Yup from "yup"; // 🔧 importa tudo sob o namespace "Yup", batendo com o uso no código
import bcrypt from "bcrypt";

class UserController {
  async store(request, response) {
    try {
      //  toda a lógica entra AQUI dentro
      const { name, email, password, admin } = request.body;

      const schema = Yup.object({
        name: Yup.string()
          .matches(/^[a-zA-Z ]+$/)
          .required(),
        email: Yup.string().email("must be a valid email").required(),
        password: Yup.string().min(6).required(),
        admin: Yup.boolean(),
      });

      schema.validateSync(request.body, { abortEarly: false, strict: true });

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return response
          .status(409)
          .json({ message: "This email is already registered" });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
      });

      return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (err) {
      return response.status(400).json({ error: err.errors }); // 🔧 agora esse catch realmente é alcançado
    }
  }
}

export default new UserController();
