const express = require("express");
const { mongoose } = require("mongoose");

const dbConfig = require("./src/config/db.config");
const authRoute = require("./src/routes/auth.routes");
const productRoute = require("./src/routes/product.routes");
const trainingRoute = require("./src/routes/training.routes");
const userRoute = require("./src/routes/userAccount.routes");
const commentRoute = require("./src/routes/comment.routes");
const messageRoutes = require("./src/routes/message.routes");
const ratingRoute = require("./src/routes/rating.route");
const orderRoute = require("./src/routes/order.routes");
const apiDescriptionRoute = require("./src/routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(dbConfig.urlAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

apiDescriptionRoute(app)

authRoute(app)
userRoute(app)
productRoute(app)
trainingRoute(app)
commentRoute(app)
messageRoutes(app)
ratingRoute(app)
orderRoute(app)