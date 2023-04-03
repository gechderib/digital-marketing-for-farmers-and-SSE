const jwt = require("jsonwebtoken");
const secretKey = require("../../config/secret.config");
const UserModel = require("../../models/auth/signup.model");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(404).send({ message: "No token provided" });
    return;
  }
  try {
    const decoded =  jwt.verify(token, secretKey);
    req.userId = decoded.id;
    next();
    return
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};


const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId, roles:"admin"});
    if (user) {
      next();
      return;
    }
    res.status(404).send({ message: "Admin role required" });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};


const isAgent = async (req, res, next) => {
  
    try {
        const user = await UserModel.findOne({_id: req.userId, roles:"agent"})
        if(user){
            next()
            return
        }
        res.status(401).send({message:"Agent role required"})
        return;
    }catch(err){
        res.status(500).send({message:err.message})
    }
}


const isFarmer = async (req, res, next) => {
    try{
        const user = await UserModel.findOne({_id: req.userId, roles:"farmer"})
        if(user){
            next()
            return
        }
        res.status(404).send({message:"Farmer role required"})
    }catch(err){
        res.status(500).send({message:err.message})
        return
    }
}


const isSse = async (req, res, next) => {
    try{
        const user = await UserModel.findOne({_id:req.userId, roles:'sse'})
        if(user){
          console.log(user)
            next()
            return
        }
        res.status(404).send({message:"Small size enterprise role required"})
        return
    }catch(err){
        res.status(500).send({message: err.message})
        return
    }
}



module.exports = { verifyToken, isAdmin, isAgent, isFarmer, isSse };
