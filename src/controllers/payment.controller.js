const { default: axios } = require("axios");

var Publishable_Key =
  "pk_test_51MtmwdGQR0aBgND8uXLJHMhxpVlTszUAJdAiYryN60bjlNg82XvqdegicaJaKbZ9RyR9qQzE2VpBdaFkh2idvS2900GRzXKnRN";
var Secret_Key =
  "sk_test_51MtmwdGQR0aBgND8h8DWTAghwTO84CDtCGUGbeHEZpoOEqzY02zVDFXVqZpVZIr2WAFJrUdlsXEGQxltEAFCA1fn00n7rHJQUa";

const stripe = require("stripe")(Secret_Key);
const chapaSecretKey = "CHASECK_TEST-inlmytxN7CFBwrf8Zm29DPgzYXnZsmrJ";

const addPayment = async (req, res) => {
  try {
    
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${chapaSecretKey}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `*`,
        },
      }
    );
    
    if(response.data.status == "success"){
      res.redirect(303, response.data.data.checkout_url);
    }
    if(response.data.status == "failed"){
      res.status(400).send({status:"failed"})
    }
    
  } catch (err) {

    res.status(500).send({ status: "error" });
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
