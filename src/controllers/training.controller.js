const TrainingModel = require("../models/training.model");

const addTraining = async (req, res) => {
  try {
    const newTraining = new TrainingModel(req.body);
    const response = await newTraining.save();
    if (response) {
      res.status(201).send({ message: "Training successfully added" });
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
    const trainingPerPage = 5;
    const response = await TrainingModel.find({})
      .skip(page * trainingPerPage)
      .limit(trainingPerPage);
    if (response) {
      res.status(200).send(response);
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
    const response = await TrainingModel.findById(id);
    if (response) {
      res.status(200).send(response);
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
      res.status(201).send({ message: "training successfully updated" });
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
    if (response) {
      res.status(200).send({ message: "data is successfully deleted" });
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
