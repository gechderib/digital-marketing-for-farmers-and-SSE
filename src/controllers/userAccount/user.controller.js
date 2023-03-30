const { ObjectId } = require("mongodb");
const { isValidObjectId } = require("mongoose");
const UserModel = require("../../models/auth/signup.model");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id }, { _id: 0, password: 0 });
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).send({ message: `user with id ${is} not found!!` });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (users) {
      res.status(200).send(users);
      return;
    }
    res.status(404).send({ message: "no user found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    const users = await UserModel.find({ roles: "farmer" });
    if (users) {
      res.status(200).send(users);
      return;
    }
    res.status(404).send({ message: "no user found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "update info can't be empty" });
    return;
  }
  const { id } = req.params;
  try {
    const response = await UserModel.findByIdAndUpdate(id, req.body, {});
    console.log("wowo");
    if (!response) {
      res.status(400).send({ message: `can't update with id ${id}` });
      return;
    } else {
      res.status(201).send({ message: "data successfully updated" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (ObjectId.isValid(id)) {
      const response = await UserModel.findByIdAndRemove(id);
      if (response) {
        res.status(200).json({ message: "successfully deleted" });
        return;
      } else {
        res.status(400).send({ message: `user with id ${id} not found` });
        return;
      }
    }
    else {
        res.status(400).send({message:"wrong id"})
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  getAllFarmers,
  updateUser,
  deleteUser,
};
