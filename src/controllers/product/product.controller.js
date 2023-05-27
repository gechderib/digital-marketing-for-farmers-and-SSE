const { ObjectId } = require("mongodb");
const OrderModel = require("../../models/order.model");
const ProductModel = require("../../models/product.model");

const addProduct = async (req, res) => {
  try {
    console.log("back back end")

    const newProduct = new ProductModel({ ...req.body, postedBy: req.userId });
    const response = await newProduct.save();
    if (response) {
      res.status(201).send(response);
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
  const productsPerPage = 10;
  try {
    const product = await ProductModel.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "postedBy",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },
      { $unwind: "$postedBy.roles" },
      {
        $group: {
          _id: "$_id",
          name: { $last: "$name" },
          description: { $last: "$description" },
          price: { $last: "$price" },
          amount: { $last: "$amount" },
          soldout: { $last: "$soldout" },
          photo: {$last:"$photo"},
          postedBy: {
            $last: {
              _id: "$postedBy._id",
              firstName: "$postedBy.firstName",
              lastName: "$postedBy.lastName",
              phoneNumber:"$postedBy.phoneNumber",
              roles: "$postedBy.roles",
              profilePicture:"$postedBy.profilePicture"
            },
          },
        },
      },
      { $skip: page * productsPerPage },
      { $limit: productsPerPage },
    ]);
    if (product) {
      res.status(200).send(product);
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

    const product = await ProductModel.aggregate([
      {$match: {_id: new ObjectId(id)}},
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "postedBy",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },
      { $unwind: "$postedBy.roles" },
      {
        $group: {
          _id: "$_id",
          name: { $last: "$name" },
          description: { $last: "$description" },
          price: { $last: "$price" },
          amount: { $last: "$amount" },
          soldout: { $last: "$soldout" },
          photo: {$last: "$photo" },
          postedBy: {
            $last: {
              _id: "$postedBy._id",
              firstName: "$postedBy.firstName",
              lastName: "$postedBy.lastName",
              phoneNumber:"$postedBy.phoneNumber",
              roles: "$postedBy.roles",
              profilePicture:"$postedBy.profilePicture"
            },
          },
        },
      },
    ]); 
    if (product) {
      res.status(200).send(product[0]);
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
    const product = await ProductModel.aggregate([
      {$match: {postedBy: new ObjectId(req.userId)}},
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "postedBy",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },
      { $unwind: "$postedBy.roles" },
      {
        $group: {
          _id: "$_id",
          name: { $last: "$name" },
          description: { $last: "$description" },
          price: { $last: "$price" },
          amount: { $last: "$amount" },
          photo: {$last: "$photo" },
          soldout: { $last: "$soldout" },
          createdAt:{$last:"$createdAt"},
          updatedAt: {$last: "$updatedAt"},
          postedBy: {
            $last: {
              _id: "$postedBy._id",
              firstName: "$postedBy.firstName",
              lastName: "$postedBy.lastName",
              phoneNumber:"$postedBy.phoneNumber",
              roles: "$postedBy.roles",
              profilePicture:"$postedBy.profilePicture"
            },
          },
        },
      },
    ]); 

    if (product) {
      res.status(200).send(product);
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
      data = {
        ...req.body,
        _id:id,
        soldout:response.soldout
      }
      console.log(req.body)
      res.status(201).send({ message: "product successfully updated", data });
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
    const order = await OrderModel.deleteMany({ product: id });
    if (response && order) {
      res.status(200).send({
        message: "product and their respective orders are successfully deleted", id:id
      });
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
