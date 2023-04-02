const { giveRate, getYourRate, updateRate, deleteRating, getProductOwnerPreviousRate } = require("../controllers/rating.controller");
const { verifyToken } = require("../middlewares/auth/authJwt");

const ratingRoute = (app) => {
    const router = require("express").Router();

    router.post("/rate/:sellerId/:productId",[verifyToken],giveRate);
    router.get("/rate/:productOwnerId",[verifyToken], getYourRate);
    router.get("/productOwnerPreviousRate/:sellerId",[verifyToken], getProductOwnerPreviousRate)
    router.patch("/rate/:id",[verifyToken], updateRate);
    router.delete("/rate/:id",[verifyToken], deleteRating)


    app.use("/api/dmfsse", router);
}


module.exports = ratingRoute;