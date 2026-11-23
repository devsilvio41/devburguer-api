import Stripe from "stripe";
import * as Yup from "yup";
import "dotenv/config";
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const stripePublishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;

const calculateOrderAmount = (products) => {
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  return total;
  // return Math.round(total); // Stripe usa centavos
};

class CreatePaymentIntentController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          }),
        ),
    });
    try {
      schema.validateSync(request.body, {
        abortEarly: false,
        strict: true,
      });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
    const { products } = request.body;
    const amount = calculateOrderAmount(products);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    response.json({
      clientSecret: paymentIntent.client_secret,

      dpmCheckerLink:
        "https://dashboard.stripe.com/settings/payment_methods/review?transation_id=${paymentIntent.id}",
    });
  }
}

export default new CreatePaymentIntentController();
