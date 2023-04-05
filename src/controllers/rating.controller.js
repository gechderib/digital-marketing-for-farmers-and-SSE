const RatingModel = require("../models/rating.model");
const UserModel = require("../models/auth/signup.model");
const ProductModel = require("../models/product.model");

const giveRate = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { productId } = req.params;
    const newRate = RatingModel({
      ...req.body,
      productOwner: sellerId,
      ratedBy: req.userId,
      product: productId,
    });
    const user = await UserModel.findOne({ _id: sellerId });
    const product = await ProductModel.findOne({ _id: productId });
    if (!user) {
      res.status(400).send({ message: "user not found" });
      return;
    }
    if (!product) {
      res.status(400).send({ message: "product not found" });
      return;
    }
    if (product.postedBy != sellerId) {
      res
        .status(400)
        .send({ message: "the product is not posted by this user" });
      return;
    }

    const response = await newRate.save();
    if (response) {
      res.status(201).send({ message: "successfully rated the seller" });
      return;
    }
    res.status(400).send({ message: "can't add teh rating" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getYourRate = async (req, res) => {
  try {
    const { productOwnerId } = req.params;

    const yourRate = await RatingModel.aggregate([
      { $match: { productOwner: productOwnerId } },
      {
        $group: {
          _id: null,
          averageRate: { $avg: "$rate" },
          count: { $sum: 1 },
        },
      },
    ]);
    if (yourRate[0]) {
      res.status(200).send(yourRate[0]);
      return;
    }
    res.status(400).send({ message: "rate note found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getProductOwnerPreviousRate = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const page = req.query.p || 0;
    const feedbackPerPage = 5;
    const previousFeedback = await RatingModel.find({ productOwner: sellerId })
      .populate("productOwner")
      .populate("ratedBy")
      .populate("product")
      .skip(page * feedbackPerPage)
      .limit(feedbackPerPage);
    if (previousFeedback) {
      res.status(200).send(previousFeedback);
      return;
    }
    res.status(400).send({ message: "feedback not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateRate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await RatingModel.findByIdAndUpdate(id, req.body);
    if (response) {
      res.status(201).send({ message: "rate is successfully updated" });
      return;
    }
    res.status(400).send({ message: "rate not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await RatingModel.findByIdAndDelete(id);
    if (response) {
      res.status(200).send({ message: "rating is successfully deleted" });
      return;
    }
    res.status(400).send({ message: "rating not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = {
  giveRate,
  getYourRate,
  getProductOwnerPreviousRate,
  updateRate,
  deleteRating,
};
