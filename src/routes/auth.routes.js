const registerUser = require("../controllers/auth/register.controller")
const signin = require("../controllers/auth/signin.controller")
const signup = require("../controllers/auth/signup.controller")
const { verifyToken, isAdmin } = require("../middlewares/auth/authJwt")
const { checkDuplicatedPhoneNumberOrEmail, checkRoleExist, checkRole2Exist } = require("../middlewares/auth/signup.middleware")

const authRoute = (app) => {

    var router = require("express").Router()

    router.post("/signup",[checkDuplicatedPhoneNumberOrEmail, checkRoleExist], signup)
    router.post("/addUser",[checkDuplicatedPhoneNumberOrEmail,checkRole2Exist,verifyToken,isAdmin],registerUser)
    router.post("/signin", signin)

    app.use("/api/dmfsse", router)
}

module.exports = authRoute
