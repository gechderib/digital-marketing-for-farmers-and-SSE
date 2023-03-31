const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  getSingleTrainingComments,
} = require("../controllers/comment.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");
const { changeComment } = require("../middlewares/product/product.middleware");

const commentRoute = (app) => {
  const router = require("express").Router();

  router.get("/comments", [verifyToken], getComments);
  router.get("/comment/:commentId", [verifyToken], getComment);
  router.get("/singleProductComments/:trainingId", [verifyToken], getSingleTrainingComments);
  router.post("/comment/:trainingId", [verifyToken], addComment);
  router.patch("/comment/:commentId", [verifyToken, changeComment], updateComment);
  router.delete("/comment/:commentId", [verifyToken, changeComment], deleteComment);

  app.use("/api/dmfsse", router);
};

module.exports = commentRoute;
