const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const ratingSchema = mongoose.Schema(
  {
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    productOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    feedback: { type: String },
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const RatingModel = mongoose.model("rating", ratingSchema);

module.exports = RatingModel;
