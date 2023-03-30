const { ObjectId } = require("mongodb");
const RegisterModel = require("../../models/auth/register.model");

const getAdminUser = async (req, res) => {
    try{
        const {id} = req.params
        const response = await RegisterModel.findById({_id:id},{passwrod:0, _id:0})
        if(response){
            res.status(200).send(response)
            return
        }
            res.status(400).send({message:`user with ${id} is not defined`})
        
    }catch(err){
        res.status(500).send({message:err.message})
        return;
    }
}

const getAdminUsers = async (req, res) => {
    try{
        const {id} = req.params
        const response = await RegisterModel.find({})
        if(response){
            res.status(200).send(response)
            return;
        }
        res.status(400).send({message:`can't get admin users`})
        return;
    }catch(err){
        res.status(400).send({message:err.message})
        return
    }
}

const getAllAgent = async (req, res) => {
    try{
        const response = await RegisterModel.find({roles:"agent"})
        if(response){
            res.status(200).send(response)
            return;
        }
        res.status(400).send("can't get agent");
        return;
    }catch(err){
        res.status(500).send({message: err.message})
        return;
    }
}

const updateAdminUser = async (req, res) => {
    try{
        const {id} = req.params;
        if(ObjectId.isValid(id)){
            const response = await RegisterModel.findByIdAndUpdate(id,req.body)
            if(response){
                res.status(201).send({message:"successfully updated"})
                return;
            }
            res.status(400).send({message:"can't update admin user"})
            return;
        }
    }catch(err){
        res.status(500).send({message: err.message})
        return;
    }
}

const deleteAdminUser = async (req, res) => {
    try{
        const {id} = req.params;
        if(ObjectId.isValid(id)){
            const response = await RegisterModel.findByIdAndRemove(id);
            if(response){
                res.status(200).send({message:"successfully deleted"})
                return;
            }
            res.status(400).send({message:"can't delete user"});
            return
        }
    }catch(err){
        res.status(500).send({message: err.message})
        return
    }
}

module.exports = {
    getAdminUser,
    getAdminUsers,
    updateAdminUser,
    deleteAdminUser,
    getAllAgent
}