const UserModel = require("../../models/auth/signup.model")


const signup = async (req, res) => {
    try{
        const newUser = new UserModel(req.body)
        const response = await newUser.save(newUser)
        if(response){
            res.status(201).json({message:"user successfully registered", data:response})
            return
        }
    }catch(err){
        res.status(500).json({message:err.message})
        return
    }
}

module.exports = signup