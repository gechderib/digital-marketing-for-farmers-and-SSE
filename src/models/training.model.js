const { default: mongoose } = require("mongoose");

const trainingSchema = mongoose.Schema({
    title:{type: String, required: true},
    description: {type: String, required:true},
    mediaFile: {type: String, required: true},
})

const TrainingModel = mongoose.model("Training", trainingSchema)

module.exports = TrainingModel