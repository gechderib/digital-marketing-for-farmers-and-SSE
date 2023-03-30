const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String },
    amount: { type: Number, required: true},
    soldout: { type: Boolean, default:false,},
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

productSchema.virtual("fromUser", {
  ref: "User",
  localField: "postedBy",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("fromAdminUser", {
  ref: "AdminUser",
  localField: "postedBy",
  foreignField: "_id",
  justOne: true,
});


const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
