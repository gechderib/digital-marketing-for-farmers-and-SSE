const jwt = require("jsonwebtoken");

const UserModel = require("../../models/auth/signup.model");
const secretKey = require("../../config/secret.config");
const RegisterModel = require("../../models/auth/register.model");

const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
    const user1 = await RegisterModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (!user && !user1) {
      res.status(404).json({ message: `User Not found` });
      return;
    }

    let isPasswordValid;
    if (user) {
      isPasswordValid = req.body.password === user.password;
      if (!isPasswordValid) {
        res.status(401).send({ message: "Invalid Password" });
        return;
      }
    }

    let isPasswordValid1;
    if (user1) {
      isPasswordValid1 = req.body.password === user1.password;
      if (!isPasswordValid1) {
        res.status(401).send({ message: "Invalid Password" });
        return;
      }
    }

    let token;
    let userId;
    let phoneNumber;
    let roles;

    if (user) {
      token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
      userId = user._id;
      (phoneNumber = user.phoneNumber), (roles = user.roles);
    }
    if (user1) {
      token = jwt.sign({ id: user1.id }, secretKey, { expiresIn: 86400 });
      userId = user1._id;
      (phoneNumber = user1.phoneNumber), (roles = user1.roles);
    }

    res.status(201).send({
      id: userId,
      phoneNumber: phoneNumber,
      roles: roles,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = signin;
