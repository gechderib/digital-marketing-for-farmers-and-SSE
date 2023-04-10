const { addPayment } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");

const paymentRoute = (app) => {
    const router = require("express").Router();

    router.post("/addPayment",[verifyToken], addPayment)

    app.use("/api/dmfsse", router)
}

module.exports = paymentRoute