const { response } = require("express");
const MessageModel = require("../models/message.model");
const UserModel = require("../models/auth/signup.model");
const { ObjectId } = require("mongodb");

const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const newMessage = MessageModel({
      ...req.body,
      sender: req.userId,
      reciever: id,
    });
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      res.status(400).send({ message: "reciever not found" });
      return;
    }
    const response = await newMessage.save();
    if (response) {
      res.status(201).send({ message: "message successfully send" });
      return;
    }
    res.status(400).send({ message: "message not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({})
      .populate("sender")
      .populate("reciever");
    if (response) {
      res.status(200).send(messages);
      return;
    }
    res.status(400).send({ message: "message not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await MessageModel.findById(id);
    if (response) {
      res.status(200).send(message);
      return;
    }
    res.status(400).send({ message: "message not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// sender or reciever in the params
// sender or reciever is looged in

const getYourMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await MessageModel.find({
      $and: [
        { $or: [{ sender: req.userId }, { reciever: req.userId }] },
        { $or: [{ sender: id }, { reciever: id }] },
      ],
    });
    if (messages) {
      res.status(200).send(messages);
      return;
    }
    res.status(400).send({ message: "messages not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getSavedMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const savedMessage = await MessageModel.find({
      $and: [
        { $or: [{ sender: req.userId }, { reciever: req.userId }] },
        { $or: [{ sender: id }, { reciever: id }] },
        { sender: { $eq: req.userId } },
        { reciever: { $eq: req.userId } },
      ],
    });
    if (savedMessage) {
      res.status(200).send(savedMessage);
      return;
    }
    res.status(400).send({ message: "message not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const connectedUserList = async (req, res) => {
  const page = req.query.p || 0;
  const userPerScroll = 10;
  try {
    const messages = await MessageModel.find({
      $or: [
        { sender: new ObjectId(req.userId) },
        { reciever: new ObjectId(req.userId) },
      ],
    });
    const userIds = [];
    for (let i = 0; i < messages.length; i++) {
      if (!userIds.includes(messages[i].sender._id)) {
        userIds.push(messages[i].sender._id);
      }
      if (!userIds.includes(messages[i].reciever._id)) {
        userIds.push(messages[i].reciever._id);
      }
    }
    const connectedUsers = await UserModel.find(
      { _id: { $in: userIds } },
      {
        password: 0,
        email: 0,
        phoneNumber: 0,
        identifictionPicture: 0,
        roles: 0,
        verified: 0,
      }
    )
      .skip(page * userPerScroll)
      .limit(userPerScroll);

    if (messages && connectedUsers) {
      res.status(200).send(connectedUsers);
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// const connectedUserLists = async (req, res) => {
//   try {
//     let page = parseInt(req.query.page) || 0;
//     let limit = parseInt(req.query.limit) || 10;

//     const messages = await MessageModel.aggregate([
//       {
//         $match: {
//           $or: [
//             { sender: new ObjectId(req.userId) },
//             { reciever: new ObjectId(req.userId) },
//           ],
//         },
//       },

//       {
//         $lookup: {
//           from: "users",
//           foreignField: "_id",
//           localField: "sender",
//           as: "sender",
//         },
//       },
//       { $unwind: "$sender" },
//       {
//         $lookup: {
//           from: "users",
//           foreignField: "_id",
//           localField: "reciever",
//           as: "reciever",
//         },
//       },
//       { $unwind: "$reciever" },

//       {
//         $group: {
//           _id: "$_id",
//           message: { $last: "$message" },
//           sender: {
//             $last: {
//               _id: "$sender._id",
//               firstName: "$sender.firstName",
//               lastName: "$sender.lastName",
//               profilePicture: "$sender.profilePicture",
//             },
//           },
//           reciever: {
//             $last: {
//               _id: "$reciever._id",
//               firstName: "$reciever.firstName",
//               lastName: "$reciever.lastName",
//               profilePicture: "$reciever.profilePicture",
//             },
//           },
//         },
//       },
//       // applay pagination
//       { $skip: page * limit },
//       { $limit: limit },
//     ]);
//     let mm = [];
//     for (let i = 0; i < messages.length; i++) {
//       if (!mm.includes(messages[i].sender._id.toString())) {
//         mm.push(messages[i].sender._id.toString());
//       }
//       if (!mm.includes(messages[i].reciever._id.toString())) {
//         mm.push(messages[i].reciever._id.toString());
//       }
//     }

//     const user = await UserModel.find({ _id: { $in: mm } });
//     console.log(user);
//     console.log(mm);
//     if (messages) {
//       res.status(200).send(messages);
//       return;
//     }
//     res.status(400).send({ messages: "message not found" });
//     return;
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//     return;
//   }
// };

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MessageModel.findByIdAndUpdate(id, req.body);
    if (response) {
      res.status(200).send({ message: "message is successfully updated" });
      return;
    }
    res.status(400).send({ message: "can't update the data" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MessageModel.findByIdAndRemove(id);
    if (response) {
      res.status(200).send({ message: "message successfully deleted" });
      return;
    }
    res.status(400).send({ message: "message not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = {
  sendMessage,
  getMessage,
  getMessages,
  getYourMessage,
  getSavedMessage,
  updateMessage,
  deleteMessage,
  connectedUserList,
};
