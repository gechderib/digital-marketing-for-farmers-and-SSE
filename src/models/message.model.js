const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
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