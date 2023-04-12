const RatingModel = require("../models/rating.model");
const UserModel = require("../models/auth/signup.model");
const ProductModel = require("../models/product.model");
const { ObjectId } = require("mongodb");

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
    if (!user) {
      res.status(400).send({ message: "user not found" });
      return;
    }
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      res.status(400).send({ message: "product not found" });
      return;
    }
    const rate = await RatingModel.findOne({productOwner:sellerId, ratedBy:req.userId,product:productId});
    if(rate){
      res.status(400).send({message: "you already rate the product"});
      return
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

    const yourRate = await RatingModel.aggregate([
      {
        $match: {productOwner: new ObjectId(sellerId) },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "productOwner",
          as: "productOwner",
        },
      },
      { $unwind: "$productOwner" },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "ratedBy",
          as: "ratedBy",
        },
      },
      { $unwind: "$ratedBy" },
      { $unwind: "$productOwner.roles" },
      { $unwind: "$ratedBy.roles" },
      {$lookup: {
        from:"products",
        foreignField:"_id",
        localField:"product",
        as: "product",
      }},
      {$unwind: "$product"},
      {
        $group: {
          _id: "$_id",
          rate: { $last: "$rate" },
          feedback:{$last: "$feedback"},
          productOwner: {
            $last: {
              _id: "$productOwner._id",
              firstName: "$productOwner.firstName",
              lastName: "$productOwner.lastName",
              roles: "$productOwner.roles",
            },
          },
          ratedBy: {
            $last: {
              _id: "$ratedBy._id",
              firstName: "$ratedBy.firstName",
              lastName: "$ratedBy.lastName",
              roles: "$ratedBy.roles",
            },
          },
          product:{
            $last: {
              _id: "$product._id",
              name:"$product.name",
              description:"$product.description",
              price:"$product.price"
            }
          }
        },
      },
    ]);
    if (yourRate) {
      res.status(200).send(yourRate);
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
