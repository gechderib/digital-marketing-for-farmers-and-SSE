const { getUser, getAllUsers, updateUser, deleteUser, getAllFarmers } = require("../controllers/userAccount/user.controller")
const { verifyToken, isAdmin, isAgent } = require("../middlewares/auth/authJwt")
const { changeUserAccount } = require("../middlewares/product/product.middleware")

const userRoute = (app) => {
    const router = require("express").Router()

    router.get("/user/:id",[verifyToken],getUser)
    router.get("/users",[verifyToken,isAdmin],getAllUsers)
    router.get("/allfarmers",[verifyToken, isAgent], getAllFarmers)
    router.delete("/user/:id",[verifyToken, changeUserAccount],deleteUser)
    router.patch("/user/:id",[verifyToken, changeUserAccount],updateUser)

    app.use("/api/dmfsse", router)
}

module.exports = userRoute