const RegisterModel = require("../../models/auth/register.model");
const UserModel = require("../../models/auth/signup.model");
const CommentModel = require("../../models/comments.model");
const ProductModel = require("../../models/product.model");

const changeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({
      _id: id,
      postedBy: req.userId,
    });
    const adminUser = await RegisterModel.findOne({ _id: req.userId, roles:"admin" });

    if (product || adminUser) {
      next();
      return
    }
    res
      .status(400)
      .send({ message: "only product owner and admin can chenge the product" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};


const changeComment = async (req, res, next) => {
  try{
    const comment = await CommentModel.findOne({commentedBy: req.userId})
    const adminUser = await RegisterModel.findOne({_id: req.userId, roles:"admin"})
    if(comment || adminUser){
      next();
      return
    }
    res.status(400).send({message: "only comment owner and admin can change"})
    return
  }catch(err){
    res.status(500).send({message: err.message});
    return
  }
}

const canAddProduct = async (req, res, next) => {
    try{
        const user = await UserModel.findOne({_id:req.userId, roles:"customer"})
        console.log(user)
        if(user){
            res.status(400).send({message: "customer can't add a product"})
            return
        }
        next();
        return;
    }catch(err){
        res.status(500).send({message: err.message})
        return
    }
}

module.exports = {changeProduct, canAddProduct, changeComment}


/// training content by admin with comment
/// rating the product owner
/// messaging 
/// payment 