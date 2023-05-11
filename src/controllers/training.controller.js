const { ObjectId } = require("mongodb");
const CommentModel = require("../models/comments.model");
const TrainingModel = require("../models/training.model");

const addTraining = async (req, res) => {
  try {
    const newTraining = new TrainingModel({
      ...req.body,
      postedBy: req.userId,
    });

    const response = await newTraining.save();
    if (response) {
      res.status(201).send(response);
      return;
    }
    res.status(400).send({ message: "can't add training" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getTrainings = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const trainingPerPage = 10;
    const trainings = await TrainingModel.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "postedBy",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },

      { $unwind: "$postedBy.roles" },

      {
        $group: {
          _id: "$_id",
          title: { $last: "$title" },
          description: { $last: "$description" },
          mediaFile: { $last: "$mediaFile" },
          createdAt: { $last: "$createdAt" },
          postedBy: {
            $last: {
              _id: "$postedBy._id",
              firstName: "$postedBy.firstName",
              lastName: "$postedBy.lastName",
              roles: "$postedBy.roles",
            },
          },
        },
      },
      { $skip: page * trainingPerPage },
      { $limit: trainingPerPage },
    ]);

    if (trainings) {
      res.status(200).send(trainings);
      return;
    }
    res.status(400).send({ message: "can't add the data" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await TrainingModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "postedBy",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },

      { $unwind: "$postedBy.roles" },

      {
        $group: {
          _id: "$_id",
          title: { $last: "$title" },
          description: { $last: "$description" },
          mediaFile: { $last: "$mediaFile" },
          postedBy: {
            $last: {
              _id: "$postedBy._id",
              firstName: "$postedBy.firstName",
              lastName: "$postedBy.lastName",
              roles: "$postedBy.roles",
            },
          },
        },
      },
    ]);
    if (training) {
      res.status(200).send(training);
      return;
    }
    res.status(400).send({ message: "data not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TrainingModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    if (response) {
      console.log(response.createdAt)
      res
        .status(201)
        .send({
          message: "training successfully updated",
          id: id,
          data:{...req.body, createdAt:response.createdAt}
        });
      return;
    }
    res.status(400).send({ message: "data not found to update" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deletTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TrainingModel.deleteOne({ _id: id });
    const comment = await CommentModel.deleteMany({ training: id });
    if (response && comment) {
      res.status(200).send({ message: "data is successfully deleted", id: id });
      return;
    }
    res.status(400).send({ message: "product not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = {
  addTraining,
  getTrainings,
  getTraining,
  updateTraining,
  deletTraining,
};

//
