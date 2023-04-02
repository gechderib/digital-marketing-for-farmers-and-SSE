const { default: mongoose } = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
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
