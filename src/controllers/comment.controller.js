const CommentModel = require("../models/comments.model");

const addComment = async (req, res) => {
  try {
    const newComment = new CommentModel(req.body);
    const response = await newComment.save();
    if (response) {
      res.status(201).send({ message });
      return;
    }
    res.status(400).send({ message: "comment is not added" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({})
      .populate("fromUser")
      .populate("fromAdminUser");
    if (comments) {
      res.status(200).send(comments);
      return;
    }
    res.status(400).send({ message: "comment not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findOne({ _id: id });
    if (comment) {
      res.status(200).send(comment);
      return;
    }
    res.status(400).send({ message: "data not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getSingleTrainingComments = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CommentModel.find({ training: id })
      .populate("fromUser")
      .populate("fromAdminUser");
    if (response) {
      res.status(200).send(response);
      return;
    }
    res.status(400).send({ message: "no comment found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findByIdAndUpdate({ _id: id }, req.body);
    if (comment) {
      res.status(201).send({ message: "comment updated successfully" });
      return;
    }
    res.status(400).send({ message: "comment not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CommentModel.deleteOne({ _id: id });
    if (response) {
      res.status(200).send({ message: "comment successfully deleted" });
      return;
    }
    res.status(400).send({ message: "comment not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = {
  addComment,
  getComments,
  getComment,
  getSingleTrainingComments,
  updateComment,
  deleteComment,
};
