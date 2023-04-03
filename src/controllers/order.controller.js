const { ObjectId } = require("mongodb");
const OrderModel = require("../models/order.model");

const addOrder = async (req, res) => {
  try {
    const { productId } = req.params;
    const newOrder = OrderModel({
      orderBy: req.userId,
      product: productId,
      ...req.body,
    });
    if (ObjectId.isValid(productId)) {
      const response = await newOrder.save();
      if (response) {
        res.status(201).send({ message: "product successfully ordered" });
        return;
      }
      res.status(400).send({ message: "order not added" });
      return;
    }else{
        res.status(404).send({message: "Product id not found"});
        return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// const 


module.exports = {addOrder}
