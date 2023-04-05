const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const messageSchema = mongoose.Schema(
  {
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    sender: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref:"User" ,required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", messageSchema)

module.exports = MessageModel