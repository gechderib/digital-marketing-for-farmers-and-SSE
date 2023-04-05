const OrderModel = require("../../models/order.model");
const ProductModel = require("../../models/product.model");

const addProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel({ ...req.body, postedBy: req.userId });
    const response = await newProduct.save();
    if (response) {
      res.status(201).send({ message: "product successfully added" });
      return;
    }
    res.status(400).send({ message: "can't add the product" });
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
      .populate("postedBy")
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

    const response = await ProductModel.findById(id).populate("postedBy");
    if (response) {
      res.status(200).send(response);
      return;
    }
    res.status(400).send({ message: `product with ${id} not found` });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMyProduct = async (req, res) => {
  try {
    const myProduct = await ProductModel.find({
      postedBy: req.userId,
    }).populate("postedBy");
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

    const response = await ProductModel.findByIdAndUpdate(id, req.body);
    if (response) {
      res.status(201).send({ message: "product successfully updated" });
      return;
    }
    res.status(400).send({ message: "can't update the data" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await ProductModel.deleteOne({ _id: id });
    const order = await OrderModel.deleteMany({product: id})
    if (response && order) {
      res.status(200).send({ message: "product and their respective orders are successfully deleted" });
      return;
    }
    res.status(400).send({ message: `can't delete product with id ${id}` });
    return;
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
