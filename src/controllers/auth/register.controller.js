const RegisterModel = require("../../models/auth/register.model")

const registerUser = async (req, res)=> {

    
    try{
        const newUser = new RegisterModel(req.body)
        const response = await newUser.save(newUser)
        if(response){
            res.status(201).send({message:"user successfully added"})
            return;
        }
    }catch(err){
        res.status(500).send({message:err.message})
        return
    }
}

module.exports = registerUser