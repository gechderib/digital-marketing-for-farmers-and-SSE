const { ObjectId } = require("mongodb");
const RatingModel = require("../models/rating.model");

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
    if (ObjectId.isValid(sellerId) && ObjectId.isValid(productId)) {
      const response = await newRate.save();
      if (response) {
        res.status(201).send({ message: "successfully rated the seller" });
        return;
      }
      res.status(400).send({ message: "can't add teh rating" });
      return;
    } else {
      res.status(400).send({ message: "wrong id" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getYourRate = async (req, res) => {
  try {
    const { productOwnerId } = req.params;
    if (ObjectId.isValid(productOwnerId)) {
      const yourRate = await RatingModel.aggregate([
        { $match: { productOwner: new ObjectId(productOwnerId) } },
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
    } else {
      res.status(400).send({ message: "wrong id" });
      return;
    }
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
