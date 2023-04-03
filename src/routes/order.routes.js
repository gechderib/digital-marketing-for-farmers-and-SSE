const { addOrder } = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");

const orderRoute = (app) => {
    const router = require("express").Router();

    router.post("/order/:productId",[verifyToken], addOrder);


    app.use("/api/dmfsse", router)
}

module.exports = orderRoute