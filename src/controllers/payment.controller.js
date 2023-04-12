var Publishable_Key =
  "pk_test_51MtmwdGQR0aBgND8uXLJHMhxpVlTszUAJdAiYryN60bjlNg82XvqdegicaJaKbZ9RyR9qQzE2VpBdaFkh2idvS2900GRzXKnRN";
var Secret_Key =
  "sk_test_51MtmwdGQR0aBgND8h8DWTAghwTO84CDtCGUGbeHEZpoOEqzY02zVDFXVqZpVZIr2WAFJrUdlsXEGQxltEAFCA1fn00n7rHJQUa";

const stripe = require("stripe")(Secret_Key);

const addPayment = async (req, res) => {
  try {
    const { productName, productImgUrl, quantity, price } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "etb",
            product_data: {
              name: productName,
              images: [`${productImgUrl}`],
            },
            unit_amount: price * quantity * 100,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5500/success.html",
      cancel_url: "http://localhost:5500/cancel.html",
    });

    res.redirect(303, session.url);
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const addPaymentTwo = async (req, res) => {
  try {
    const { amount, receipt_email } = req.body;
    const paymentIntent = await stripe.paymentIntent.create({
      amount: amount,
      currency: "etb",
      receipt_email: `${receipt_email}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({clientSecret: paymentIntent.client_secret});
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = { addPayment, addPaymentTwo };
