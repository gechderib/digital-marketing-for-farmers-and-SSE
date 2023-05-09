const { default: mongoose } = require("mongoose");

const trainingSchema = mongoose.Schema(
  {
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    title: { type: String, required: false },
    description: { type: String, required: false },
    mediaFile: { type: String, required: false },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    
    timestamps: true,
  }
);

const TrainingModel = mongoose.model("Training", trainingSchema);

module.exports = TrainingModel;
