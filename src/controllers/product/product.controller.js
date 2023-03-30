const { ObjectId } = require("mongodb");
const RegisterModel = require("../../models/auth/register.model");
const ProductModel = require("../../models/product.model");

const addProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel({ ...req.body, postedBy: req.userId });
    const response = await newProduct.save();
    if (response) {
      res.status(201).send({ message: "product successfully added" });
      return;
    }
    res.status(400).send({ message: "cant add the product" });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getAllProducts = async (req, res) => {
  const page = req.query.p || 0;
  const productsPerPage = 5;
  try {
    const response = await ProductModel.find({})
      .populate("fromAdminUser")
      .populate("fromUser")
      .skip(page * productsPerPage)
      .limit(productsPerPage);
    if (response) {
      res.status(200).send(response.reverse());
      return;
    }
    res.status(400).send({ message: "products not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const response = await ProductModel.findById(id)
        .populate("fromAdminUser")
        .populate("fromUser");
      if (response) {
        res.status(200).send(response);
        return;
      }
      res.status(400).send({ message: `product with ${id} not found` });
      return;
    } else {
      res.status(400).send({ message: "wrong id" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMyProduct = async (req, res) => {
  try {
    const myProduct = await ProductModel.find({ postedBy: req.userId })
      .populate("fromUser")
      .populate("fromAdminUser");
    if (myProduct.length > 0) {
      res.status(200).send(myProduct);
      return;
    }
    res.status(400).send({ message: "product is not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// product owner
// admin, agent
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const response = await ProductModel.findByIdAndUpdate(id, req.body);
      if (response) {
        res.status(201).send({ message: "product successfully updated" });
        return;
      }
      res.status(400).send({ message: "can't update the data" });
      return;
    } else {
      res.status(400).send({ message: "wrong product id" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const response = await ProductModel.deleteOne({ _id: id });
      if (response) {
        res.status(200).send({ message: "product successfully deleted" });
        return;
      }
      res.status(400).send({ message: `can't delete product with id ${id}` });
      return;
    } else {
      res.status(400).send({ message: "Wrong product id" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMyProduct,
};
