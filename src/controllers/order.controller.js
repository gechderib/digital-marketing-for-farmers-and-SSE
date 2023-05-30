const { ObjectId } = require("mongodb");
const UserModel = require("../models/auth/signup.model");
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
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(400).send({ message: "user not found" });
      return;
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(400).send({ message: "product not found" });
      return;
    }
    if (product.postedBy == req.userId) {
      res.status(400).send({ message: "you can't order your product" });
      return;
    }
    const order = await OrderModel.findOne({
      orderBy: req.userId,
      product: productId,
    });
    if (order) {
      res.status(400).send({ message: "order already exist" });
      return;
    }

    const response = await newOrder.save();

    if (response) {
      console.log(response)
      const myOrders = await OrderModel.aggregate([
        {$match: { _id: new ObjectId(response._id)}},
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "orderBy",
            as: "orderBy",
          },
        },
        { $unwind: "$orderBy" },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $group: {
            _id: "$_id",
            quantity: { $last: "$quantity" },
            offerPrice: {$last: "$offerPrice"},
            accepted: { $last: "$accepted" },
            canRate: { $last: "$canRate" },
            createdAt:{$last:"$createdAt"},
            updatedAt: {$last:"$updatedAt"},
            orderBy: {
              $last: {
                _id: "$orderBy._id",
                firstName: "$orderBy.firstName",
                lastName: "$orderBy.lastName",
                roles: "$orderBy.roles",
              },
            },
            product: {
              $last: {
                _id: "$product._id",
                name: "$product.name",
                price:"$product.price",
                description: "$product.description",
                postedBy: "$product.postedBy",
                photo:"$product.photo"
                  
              },
            },
          },
        },
      ]);
      res.status(201).send(myOrders);
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
    const allOrders = await OrderModel.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "orderBy",
          as: "orderBy",
        },
      },
      { $unwind: "$orderBy" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$_id",
          quantity: { $last: "$quantity" },
          offerPrice: {$last: "$offerPrice"},
          accepted: { $last: "$accepted" },
          canRate: { $last: "$canRate" },
          createdAt:{$last:"$createdAt"},
          updatedAt: {$last:"$updatedAt"},
          orderBy: {
            $last: {
              _id: "$orderBy._id",
              firstName: "$orderBy.firstName",
              lastName: "$orderBy.lastName",
              roles: "$orderBy.roles",
            },
          },
          product: {
            $last: {
              _id: "$product._id",
              name: "$product.name",
              price:"$product.price",
              description: "$product.description",
              postedBy: "$product.postedBy",
                
              
            },
          },
        },
      },
    ]);
    if (allOrders) {
      res.status(200).send(allOrders);
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
    const order = await OrderModel.aggregate([
      {$match:{_id: new ObjectId(id)}},
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "orderBy",
          as: "orderBy",
        },
      },
      { $unwind: "$orderBy" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$_id",
          quantity: { $last: "$quantity" },
          offerPrice: {$last: "$offerPrice"},
          accepted: { $last: "$accepted" },
          canRate: { $last: "$canRate" },
          createdAt:{$last:"$createdAt"},
          updatedAt: {$last:"$updatedAt"},
          orderBy: {
            $last: {
              _id: "$orderBy._id",
              firstName: "$orderBy.firstName",
              lastName: "$orderBy.lastName",
              roles: "$orderBy.roles",
            },
          },
          product: {
            $last: {
              _id: "$product._id",
              name: "$product.name",
              price:"$product.price",
              description: "$product.description",
              postedBy: "$product.postedBy",
            },
          },
        },
      },
    ]);
    
    if (order[0]) {
      res.status(200).send(order[0]);
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

    const myOrders = await OrderModel.aggregate([
      {$match: { orderBy: new ObjectId(req.userId)}},
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "orderBy",
          as: "orderBy",
        },
      },
      { $unwind: "$orderBy" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$_id",
          quantity: { $last: "$quantity" },
          offerPrice: {$last: "$offerPrice"},
          accepted: { $last: "$accepted" },
          canRate: { $last: "$canRate" },
          createdAt:{$last:"$createdAt"},
          updatedAt: {$last:"$updatedAt"},
          orderBy: {
            $last: {
              _id: "$orderBy._id",
              firstName: "$orderBy.firstName",
              lastName: "$orderBy.lastName",
              roles: "$orderBy.roles",
            },
          },
          product: {
            $last: {
              _id: "$product._id",
              name: "$product.name",
              price:"$product.price",
              description: "$product.description",
              postedBy: "$product.postedBy",
              photo:"$product.photo"
                
              
            },
          },
        },
      },
    ]);

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

    const myOrders = await OrderModel.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "orderBy",
          as: "orderBy",
        },
      },
      { $unwind: "$orderBy" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product",
          as: "product",
        },
      },
      { $unwind: "$product" },

      {
        $group: {
          _id: "$_id",
          quantity: { $last: "$quantity" },
          offerPrice:{$last:"$offerPrice"},
          accepted: { $last: "$accepted" },
          canRate: { $last: "$canRate" },
          createdAt:{$last:"$createdAt"},
          updatedAt: {$last:"$updatedAt"},
          orderBy: {
            $last: {
              _id: "$orderBy._id",
              firstName: "$orderBy.firstName",
              lastName: "$orderBy.lastName",
              roles: "$orderBy.roles",
            },
          },
          product: {
            $last: {
              _id: "$product._id",
              name: "$product.name",
              price:"$product.price",
              description: "$product.description",
              postedBy: "$product.postedBy",
              photo: "$product.photo"
            },
          },
        },
      },
    ]);
    const myOffers = [];

    for (let i = 0; i < myOrders.length; i++) {
      if (myOrders[i].product.postedBy == req.userId) {
        myOffers.push(myOrders[i]);
      }
    }
    if (myOrders && myOffers.length > 0) {
      res.status(200).send(myOffers);
      return;
    }

    res.status(400).send(myOffers);
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
      const myOrders = await OrderModel.aggregate([
        {$match: { _id: new ObjectId(response._id)}},
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "orderBy",
            as: "orderBy",
          },
        },
        { $unwind: "$orderBy" },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $group: {
            _id: "$_id",
            quantity: { $last: "$quantity" },
            offerPrice: {$last: "$offerPrice"},
            accepted: { $last: "$accepted" },
            canRate: { $last: "$canRate" },
            createdAt:{$last:"$createdAt"},
            updatedAt: {$last:"$updatedAt"},
            orderBy: {
              $last: {
                _id: "$orderBy._id",
                firstName: "$orderBy.firstName",
                lastName: "$orderBy.lastName",
                roles: "$orderBy.roles",
              },
            },
            product: {
              $last: {
                _id: "$product._id",
                name: "$product.name",
                price:"$product.price",
                description: "$product.description",
                postedBy: "$product.postedBy",
                photo:"$product.photo"
                  
              },
            },
          },
        },
      ]);
      res.status(201).send(myOrders);
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
