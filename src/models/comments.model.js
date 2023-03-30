const { mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
    comment:{type: String},
    training: {type: mongoose.Schema.Types.ObjectId, ref:"Training", required:true},
    commentedBy: {type: mongoose.Schema.Types.ObjectId, required:true,},
},{
    toJSON:{virtuals:true},
    timestamps:true
})

commentSchema.virtual("fromUser",{
    ref:"User",
    localField:"commentedBy",
    foreignField:"_id",
    justOne:false
})

commentSchema.virtual("fromAdminUser",{
    ref:"AdminUser",
    localField:"commentedBy",
    foreignField:"_id",
    justOne:false
})

const CommentModel = mongoose.model("Comment", commentSchema)

module.exports = CommentModel