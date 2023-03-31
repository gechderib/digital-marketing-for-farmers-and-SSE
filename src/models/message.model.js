const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    reciever: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
  },
  {
    toJSON:{virtuals: true},
    timestamps: true,
  }
);

messageSchema.virtual("senderFromUser",{
    ref:"User",
    localField:"sender",
    foreignField:"_id",
    justOne:true
})

messageSchema.virtual("senderFromAdminUser",{
    ref:"AdminUser",
    localField:"sender",
    foreignField:"_id",
    justOne:true
})

messageSchema.virtual("recieverFromUser",{
    ref:"User",
    localField:"reciever",
    foreignField:"_id",
    justOne:true
})

messageSchema.virtual("recieverFromAdminUser",{
    ref:"AdminUser",
    localField:"reciever",
    foreignField:"_id",
    justOne:true
})


const MessageModel = mongoose.model("message", messageSchema)

module.exports = MessageModel