const { mongoose } = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    firstName:{type:String, default:"Firstname"},
    lastName:{type:String,default:"Lastname"},
    email: String,
    phoneNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: {type:[String], default:["agent"]},
    profilePicture:String,
  },
  {
    timestamps: true,
  }
);


const RegisterModel = mongoose.model("AdminUser", registerSchema);

module.exports = RegisterModel;
