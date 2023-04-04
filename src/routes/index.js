const apiDescriptionController = async (req, res) => {
  try {
    res.status(200).send(
     ` <html>
        <h1>Digital Marketing for Farmer and Small Sized Enterprises API</h1>
        <h2>API description and usage</h2>
        <h3>Authentication</h3>
        <ul>
            <li><a href="#">/signup</a>  <span>to signup as farmer, sse or customer</span></li>
            <li><a href="#">/register</a> <span>to add Agent and Admin</span></li>
            <li><a href="#">/signin</a> <span>to login as a user, password and phone number required</span></li>
            
        </ul>
        <h3>Product</h3>
        <ul>
            <li>Add product </li>
        </ul>
      </html>`
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const apiDescriptionRoute = (app) => {
  const router = require("express").Router();

  router.get("/", apiDescriptionController);
  app.use("/", router);
};

module.exports = apiDescriptionRoute;
