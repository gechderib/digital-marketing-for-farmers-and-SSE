const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");

const addOrder = async (req, res) => {
  try {
    const { productId } = req.params;
    const newOrder = OrderModel({
      orderBy: req.userId,
      product: productId,
      ...req.body,
    });

    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(400).send({ message: "product not found" });
      return;
    }

    const order = OrderModel.findOne({orderBy: req.userId, productId: productId})
    if(order){
      res.status(400).send({message: "order already exist"});
      return;
    }
    const response = await newOrder.save();
    if (response) {
      res.status(201).send({ message: "product successfully ordered" });
      return;
    }
    res.status(400).send({ message: "order not added" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("orderBy")
      .populate("product");
    if (orders) {
      res.status(200).send(orders);
      return;
    }
    res.status(400).send({ message: "order not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findOne({ _id: id });
    if (order) {
      res.status(200).send(order);
      return;
    }
    res.status(400).send({ message: "order not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMyOrders = async (req, res) => {
  try {
    const myOrders = await OrderModel.find({ orderBy: req.userId }).populate(
      "product"
    );
    if (myOrders) {
      res.status(200).send(myOrders);
      return;
    }
    res.status(400).send({ message: "no order found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const myOffer = async (req, res) => {
  try {
    const offers = await OrderModel.find({}).populate({ path: "product" });
    const myOffers = [];

    for (let i = 0; i < offers.length; i++) {
      if (offers[i].product.postedBy == req.userId) {
        myOffers.push(offers[i]);
      }
    }
    if (offers) {
      res.status(200).send(myOffers);
      return;
    }
    res.status(400).send({ message: "offer not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await OrderModel.findByIdAndDelete(id);
    if (response) {
      res.status(200).send({ message: "order successfully deleted" });
      return;
    }
    res.status(400).send({ message: "order not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await OrderModel.findByIdAndUpdate(id, req.body);
    if (response) {
      res.status(201).send({ message: "order successfully updated" });
      return;
    }
    res.status(400).send({ message: "ordernot found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};
module.exports = {
  addOrder,
  getOrders,
  getOrder,
  getMyOrders,
  myOffer,
  deleteOrder,
  updateOrder,
};
