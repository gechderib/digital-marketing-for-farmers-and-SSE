
const UserModel = require("../models/auth/signup.model");

var Publishable_Key = "pk_test_51MtmwdGQR0aBgND8uXLJHMhxpVlTszUAJdAiYryN60bjlNg82XvqdegicaJaKbZ9RyR9qQzE2VpBdaFkh2idvS2900GRzXKnRN";
var Secret_Key = "sk_test_51MtmwdGQR0aBgND8h8DWTAghwTO84CDtCGUGbeHEZpoOEqzY02zVDFXVqZpVZIr2WAFJrUdlsXEGQxltEAFCA1fn00n7rHJQUa";

const stripe = require("stripe")(Secret_Key);

const addPayment = async (req, res) => {
    try{
        console.log(req.body);
        const user = await UserModel.findById(req.userId);

        const customer = await stripe.customers.create({})
    }catch(err){
        res.status(500).send({message: err.message});
        return;
    }
}