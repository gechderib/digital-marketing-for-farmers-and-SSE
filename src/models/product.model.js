const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const productSchema = mongoose.Schema(
  {
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String },
    amount: { type: Number, required: true},
    soldout: { type: Boolean, default:false,},
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
  },
  {
    timestamps: true,
  },
);


const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
