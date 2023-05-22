const {
  addOrder,
  getOrders,
  getOrder,
  getMyOrders,
  myOffer,
  deleteOrder,
  updateOrder,
} = require("../controllers/order.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth/authJwt");
const { changeOrder, checkStatusExist } = require("../middlewares/product/product.middleware");

const orderRoute = (app) => {
  const router = require("express").Router();

  router.post("/order/:productId", [verifyToken], addOrder);
  router.get("/orders", [verifyToken, isAdmin], getOrders);
  router.get("/order/:id", [verifyToken], getOrder);
  router.get("/myOrders", [verifyToken], getMyOrders);
  router.get("/myOffers", [verifyToken], myOffer);
  router.delete("/order/:id", [verifyToken, changeOrder], deleteOrder);
  router.patch("/order/:id", [verifyToken, changeOrder, checkStatusExist], updateOrder);

  app.use("/api/dmfsse", router);
};

module.exports = orderRoute;
