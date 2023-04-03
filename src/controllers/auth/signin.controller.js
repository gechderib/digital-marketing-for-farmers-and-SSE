const jwt = require("jsonwebtoken");
const UserModel = require("../../models/auth/signup.model");
const secretKey = require("../../config/secret.config");

const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });

    if (!user) {
      res.status(404).json({ message: `User Not found` });
      return;
    }

    let isPasswordValid = req.body.password === user.password;
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });

    res.status(201).send({
      id: user._id,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = signin;
