const { mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const signupSchema = mongoose.Schema(
  {
    // _id: { type: String, default:  uuidv4().replace(/\-/g, "") },
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email: {type: String, default: "example@gmail.com"},
    phoneNumber: {type:String, required:true, unique:true},
    password: {type: String, required:true},
    roles: {type:[String], default:["customer"]},
    profilePicture:{type: String},
    identifictionPicture:{type:String, required: isSseOrFarmer},
    verified:{type: Boolean, default:false}
  },
  {
    timestamps: true,
  }
);


function isSseOrFarmer() {
    if(this.roles.includes("sse") || this.roles.includes("farmer")){
        return true
    }
    return false
}

const UserModel = mongoose.model("User",signupSchema)

module.exports = UserModel