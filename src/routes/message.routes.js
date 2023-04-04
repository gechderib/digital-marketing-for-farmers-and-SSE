const { sendMessage, getMessages, getMessage, getYourMessage, getSavedMessage, updateMessage, deleteMessage } = require("../controllers/message.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth/authJwt");
const { changeMessage } = require("../middlewares/product/product.middleware");

const messageRoutes = (app) => {
    const router = require("express").Router();

    router.post("/message/:id",[verifyToken], sendMessage)
    router.get("/messages",[verifyToken, isAdmin], getMessages)
    router.get("/message/:id",[verifyToken], getMessage)
    router.get("/getYourMessage/:id",[verifyToken], getYourMessage)
    router.get("/getSavedMessages/:id",[verifyToken],getSavedMessage)
    router.patch("/message/:id",[verifyToken, changeMessage], updateMessage)
    router.delete("/message/:id",[verifyToken, changeMessage], deleteMessage)

    app.use("/api/dmfsse", router)
}

module.exports = messageRoutes