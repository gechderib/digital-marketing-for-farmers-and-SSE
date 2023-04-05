const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const trainingSchema = mongoose.Schema({
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    title:{type: String, required: true},
    description: {type: String, required:true},
    mediaFile: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}
},{
    timestaps:true
})

const TrainingModel = mongoose.model("Training", trainingSchema)

module.exports = TrainingModel