const UserModel = require("../../models/auth/signup.model");
const CommentModel = require("../../models/comments.model");
const MessageModel = require("../../models/message.model");
const ProductModel = require("../../models/product.model");
const RatingModel = require("../../models/rating.model");
const OrderModel = require("../../models/order.model");
const { Status } = require("../../models");

const changeUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({
      $or: [
        { $and: [{ _id: req.userId }, { _id: id }] },
        { $and: [{ _id: req.userId }, { roles: "admin" }] },
      ],
    });
    if (user) {
      next();
      return;
    }
    res
      .status(400)
      .send({ message: "only account owner and admin can chenge the account" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const changeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({
      _id: id,
      postedBy: req.userId,
    });
    const adminUser = await UserModel.findOne({
      _id: req.userId,
      roles: "admin",
    });

    if (product || adminUser) {
      next();
      return;
    }
    res
      .status(400)
      .send({ message: "only product owner and admin can chenge the product" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const changeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findOne({
      $or: [
        { $and: [{ commentedBy: req.userId }, { _id: commentId }] },
        { $and: [{ _id: req.userId }, { roles: "admin" }] },
      ],
    });
    if (comment) {
      next();
      return;
    }
    res
      .status(400)
      .send({
        message:
          "only comment owner and admin can change or comment should exist",
      });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const changeMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await MessageModel.findOne({
      _id: id,
      sender: req.userId,
    });
    if (response) {
      next();
      return;
    }
    res.status(400).send({ message: "you can only change your message" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const changeRate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await RatingModel.findOne({
      _id: id,
      ratedBy: req.userId,
    });
    const adminUser = await UserModel.findOne({
      _id: req.userId,
      roles: "admin",
    });
    if (response || adminUser) {
      next();
      return;
    }
    res.status(400).send({ message: "you can only change your rate" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const changeOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findOne({_id: id });
    if(!order){
      res.status(400).send({message: "you have to be order owner or offer owner or admin to change data"});
      return
    }
    const productId = order.product;
    const product = await ProductModel.findById(productId).populate("postedBy");
    const postedBy = await UserModel.findById(product.postedBy._id)

    const adminUser = await UserModel.findOne({
      _id: req.userId,
      roles: "admin",
    });

    if (order.orderBy == req.userId || adminUser || postedBy) {
      next();
      return;
    }
    res.status(400).send({ message: "only order owner and admin can change" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const canAddProduct = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.userId,
      roles: "customer",
    });
    if (user) {
      res.status(400).send({ message: "customer can't add a product" });
      return;
    }
    next();
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const canRate = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const user = await UserModel.findById(req.userId);
    const product = await ProductModel.findById(productId);
    if(!user || !product){
      res.status(400).send({message: "product id or user doesn't exist"});
      return;
    }
    const order = await OrderModel.findOne({
      orderBy: req.userId,
      product: productId,
      accepted: "accepted",
      canRate: "accepted",
    });
    if (!order) {
      res
        .status(400)
        .send({
          message:
            "your order is not accepted or you didn't complet the payment",
        });
      return;
    }
    next();
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const checkStatusExist = async (req, res, next) => {
  console.log(req.body)
  if(!Status.includes(req.body.accepted)){
    res.status(400).send({message: `${req.body.accepted} status doesn't exist`});
    return
  }
  next()
};

module.exports = {
  checkStatusExist,
  changeUserAccount,
  changeProduct,
  canAddProduct,
  changeComment,
  changeMessage,
  changeRate,
  changeOrder,
  canRate
};

/// training content by admin with comment
/// rating the product owner
/// messaging
/// payment
