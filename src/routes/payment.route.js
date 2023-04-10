const { addPayment, addPaymentTwo } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");

const paymentRoute = (app) => {
    const router = require("express").Router();

    router.post("/stripeCheckout",[verifyToken], addPayment)
    router.post("/stripPaymentIntent",[verifyToken], addPaymentTwo)

    app.use("/api/dmfsse", router)
}

module.exports = paymentRoute