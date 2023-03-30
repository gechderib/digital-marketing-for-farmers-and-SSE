const { addTraining, getTrainings, getTraining, updateTraining, deletTraining } = require("../controllers/training.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth/authJwt");

const trainingRoute = (app) => {
    const router = require("express").Router();

    router.post("/addTraining",[verifyToken, isAdmin], addTraining);
    router.get("/trainings",[verifyToken],getTrainings);
    router.get("/training/:id",[verifyToken],getTraining);
    router.patch("/training/:id",[verifyToken, isAdmin],updateTraining);
    router.delete("/training/:id",[verifyToken, isAdmin],deletTraining)

    app.use("/api/dmfsse", router)
}


module.exports = trainingRoute