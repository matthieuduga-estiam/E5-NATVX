import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const create = async (req, res) => {
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      payment_method_types: ["card"],
      receipt_email: req.body.email,
      shipping: {
        name: req.body.name,
        address: {
          line1: req.body.address,
          postal_code: req.body.zipCode,
          city: req.body.city,
          country: req.body.country,
        },
      },
      metadata: {
        Article: req.body.item,
      },
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
};
