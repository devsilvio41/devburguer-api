import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String, // 🔧 UUID é string, não Number
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: { type: Number, required: true }, // 🔧 removido "user" aninhado
        name: { type: String, required: true },
        price: { type: Number, required: true }, // 🔧 era String
        category: { type: String }, // 🔧 era objeto com "required" inválido
        quantity: { type: Number, required: true },
        url: { type: String }, // 🔧 sem required — produto pode não ter path/url
      },
    ],
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", OrderSchema);
