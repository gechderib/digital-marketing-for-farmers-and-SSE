const { getAdminUser, getAdminUsers, getAllAgent, updateAdminUser, deleteAdminUser } = require("../controllers/userAccount/adminUser.controller")
const { getUser, getAllUsers, updateUser, deleteUser, getAllFarmers } = require("../controllers/userAccount/user.controller")
const { verifyToken, isAdmin, isAgent } = require("../middlewares/auth/authJwt")

const userRoute = (app) => {
    const router = require("express").Router()

    router.get("/user/:id",[verifyToken],getUser)
    router.get("/users",[verifyToken,isAdmin],getAllUsers)
    router.get("/allfarmers",[verifyToken, isAgent], getAllFarmers)
    router.delete("/user/:id",[verifyToken],deleteUser)
    router.patch("/user/:id",[verifyToken],updateUser)

    router.get("/adminUser/:id",[verifyToken],getAdminUser)
    router.get("/adminUsers",[verifyToken,isAdmin],getAdminUsers)
    router.get("/allAgent",[verifyToken, isAdmin],getAllAgent)
    router.patch("/adminUser/:id",[verifyToken],updateAdminUser)
    router.delete("/adminUser/:id",[verifyToken],deleteAdminUser)
    
    app.use("/api/dmfsse", router)
}

module.exports = userRoute