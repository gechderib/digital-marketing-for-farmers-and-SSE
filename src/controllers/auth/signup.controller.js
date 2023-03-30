const UserModel = require("../../models/auth/signup.model")


const signup = async (req, res) => {
    try{
        const newUser = new UserModel(req.body)
        const response = await newUser.save(newUser)
        if(response){
            res.status(201).send({message:"user successfully registered"})
            return
        }
    }catch(err){
        res.status(500).send({message:err.message})
        return
    }
}

module.exports = signup