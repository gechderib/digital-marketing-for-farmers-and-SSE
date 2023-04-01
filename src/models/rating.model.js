const { default: mongoose } = require("mongoose");

const ratingSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required: true},
    ratedBy:{type: mongoose.Schema.Types.ObjectId, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, required: true},
    feedback:{type: String},
    rate:{type: Number, required:true}
})
