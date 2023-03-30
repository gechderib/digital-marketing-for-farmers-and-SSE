const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");
const { changeComment } = require("../middlewares/product/product.middleware");

const commentRoute = (app) => {
  const router = require("express").Router();

  router.get("/comments", [verifyToken], getComments);
  router.get("/comment/:id", [verifyToken], getComment);
  router.get("/singleProductComments/:id", [verifyToken], getComment);
  router.post("/comment", [verifyToken], addComment);
  router.patch("/comment/:id", [verifyToken, changeComment], updateComment);
  router.delete("/comment/:id", [verifyToken, changeComment], deleteComment);

  app.use("/api/dmfsse", router);
};

module.exports = commentRoute;
