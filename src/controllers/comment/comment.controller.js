const CommentModel = require("../../models/comments.model");

const addComment = async (req, res) => {
  try {
    const newComment = new CommentModel(req.body);
    const response = await newComment.save();
    if (response) {
      res.status(201).send({ message: "comment successfully added" });
      return;
    }
    res.status(400).send({ message: "can't add the comment" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getComments = async (req, res) => {
  try {
    const response = await CommentModel.find({})
      .populate("fromUser")
      .populate("fromAdminUser");
    if (response) {
      res.status(200).send(response);
      return;
    }
    res.status(400).send({ message: "can't get the data" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getComment = async (req, res) => {
  try {
    const response = await CommentModel.findOne({ _id: id })
      .populate("fromUser")
      .populate("fromAdminUser");
    if (response) {
        res.status(200).send(response);
        return
    }
    res.status(400).send({message: "comment not found"})
    return
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateComment = async (req, res) => {
    try{
        const response = await CommentModel.findByIdAndUpdate()
    }catch(err){
        res.status(500).send({message: err.message});
        return;
    }
}

module.exports = { addComment, getComments, getComment };
