const { mongoose } = require("mongoose");

const signupSchema = mongoose.Schema(
  {
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email: String,
    phoneNumber: {type:String, required:true, unique:true},
    password: String,
    roles: {type:[String], default:["customer"]},
    profilePicture:String,
    sseLicense:{type:String, require: isSse},
    farmerIdPicture:{type:String, required:isFarmer}
  },
  {
    timestamps: true,
  }
);

function isFarmer(){
    if(this.roles.includes("farmer")){
        return true
    }
    return false
}

function isSse() {
    if(this.roles.includes("sse")){
        return true
    }
    return false
}

const UserModel = mongoose.model("User",signupSchema)

module.exports = UserModel