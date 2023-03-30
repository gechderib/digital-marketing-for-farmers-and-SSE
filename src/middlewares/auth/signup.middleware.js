const { ROLES, ROLE2 } = require("../../models");
const RegisterModel = require("../../models/auth/register.model");
const UserModel = require("../../models/auth/signup.model");

const checkDuplicatedPhoneNumberOrEmail = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });
    const user2 = await RegisterModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    const email = await UserModel.findOne({ email: req.body.email });
    const email2 = await RegisterModel.findOne({ email: req.body.email });
    if (user || user2) {
      res.status(409).json({ message: "Phone number already exist" });
      return;
    }
    if (email || email2) {
      res.status(409).json({ message: "Email already exist" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkRoleExist = async (req, res, next) => {
  if (req.body.roles) {
    let roleCount = req.body.roles.length;
    for (let i = 0; i < roleCount; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({ message: `${req.body.roles[i]} doesn't exist` });
        return;
      }
    }
  }
  next()
};

const checkRole2Exist = async (req, res, next) => {
  if (req.body.roles) {
    let roleCount = req.body.roles.length;
    for (let i = 0; i < roleCount; i++) {
      if (!ROLE2.includes(req.body.roles[i])) {
        res.status(400).json({ message: `${req.body.roles[i]} doesn't exist 1` });
        return;
      }
    }
  }
  next()
};




module.exports = { checkDuplicatedPhoneNumberOrEmail, checkRoleExist, checkRole2Exist };
