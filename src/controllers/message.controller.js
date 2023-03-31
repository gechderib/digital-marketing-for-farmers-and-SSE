const { response } = require("express");
const MessageModel = require("../models/message.model");
const { ObjectId } = require("mongodb");

const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const newMessage = MessageModel({
        ...req.body,
        sender: req.userId,
        reciever: id,
      });
      const response = await newMessage.save();
      if (response) {
        res.status(201).send({ message: "message successfully send" });
        return;
      }
      res.status(400).send({ message: "message not found" });
      return;
    } else {
      res.status(401).send({ message: "wrong id" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({})
      .populate("senderFromUser")
      .populate("senderFromAdminUser")
      .populate("recieverFromUser")
      .populate("recieverFromAdminUser");
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
    const {id} = req.params
    const savedMessage = await MessageModel.find({
      $and: [
        { $or: [{ sender: req.userId }, { reciever: req.userId }] },
        { $or: [{ sender: id }, { reciever: id }] },
        { sender: { $eq: req.userId } },
        { reciever: {$eq: req.userId }}
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

const updateMessage = async (req, res) => {
  try{
    const {id} = req.params
    const response = await MessageModel.findByIdAndUpdate(id, req.body)
    if(response){
      res.status(200).send({message: "message is successfully updated"})
      return
    }
    res.status(400).send({message: "can't update the data"})
    return
  }catch(err){
    res.status(500).send({message: err.message});
    return
  }
}


const deleteMessage = async (req, res) => {
  try{
    const {id} = req.params
    const response = await MessageModel.findByIdAndRemove(id)
    if(response){
      res.status(200).send({message: "message successfully deleted"});
      return
    }    
    res.status(400).send({message: "message not found"})
    return
  }catch(err){
    res.status(500).send({message: err.message});
    return;
  }
}

module.exports = {
  sendMessage,
  getMessage,
  getMessages,
  getYourMessage,
  getSavedMessage,
  updateMessage,
  deleteMessage
};
