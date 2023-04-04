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
          <li><a href="#">/api/dmfsse/addProduct</a> <span>add product to sell</span></li>
          <li><a href="#">/api/dmfsse/products</a> <span>get list of products</span></li>
          <li><a href="#">/api/dmfsse/product/id</a> <span>get a single product by id</span></li>
          <li><a href="#">/api/dmfsse/myProduct/id</a> <span>get the product posted by you</span></li>
          <li><a href="#">/api/dmfsse/product/id</a> <span>delete a product if you are owner of the product or admin</span></li>
          <li><a href="#">/api/dmfsse/product/id</a> <span>delete a product if you are owner of the product or admin</span></li>
        </ul>
        <h3>User Account</h3>
        <ul>
            <li><a href="#">/api/dmfsse/user/id</a> <span>get your profile information</span></li>
            <li><a href="#">/api/dmfsse/users</a> <span>get list of user only admin</span></li>
            <li><a href="#">/api/dmfsse/allFarmers</a> <span>get list of farmers only agent</span></li>
            <li><a href="#">/api/dmfsse/user/id</a> <span>delete your account only account owner and admin can do this</span></li>
            <li><a href="#">/api/dmfsse/user/id</a> <span>update your account only account owner and admin can do this</span></li>
        </ul>

        <h3>Training</h3>
        <ul>
          <li><a href="#">/api/dmfsse/addTraining</a> <span>add training if only admin</span></li>
          <li><a href="#">/api/dmfsse/trainings</a> <span>get list of trainings</span></li>
          <li><a href="#">/api/dmfsse/training/id</a> <span>get single training</span></li>
          <li><a href="#">/api/dmfsse/training/id</a> <span>delete training only admin </span></li>
          <li><a href="#">/api/dmfsse/training/id</a> <span>update training only admin</span></li>
        </ul>

        <h3>Comment Training</h3>
        <ul>
          <li><a href="#">/api/dmfsse/comment/trainingId</a> <span>add comment to training</span></li>
          <li><a href="#">/api/dmfsse/comments</a> <span>get list of comments</span></li>
          <li><a href="#">/api/dmfsse/comment/commentId</a> <span>get single comment</span></li>
          <li><a href="#">/api/dmfsse/singleProductComments/trainingId</a> <span>get list of comment for a given training</span></li>
          <li><a href="#">/api/dmfsse/comment/commentId</a> <span>delete comment only comment owner and admin</span></li>
          <li><a href="#">/api/dmfsse/comment/commentId</a> <span>update comment only comment owner and admin</span></li>
        </ul>

        <h3>Message</h3>
        <ul>
        <li><a href="#">/api/dmfsse/message/id</a> <span>send message to user with id number id. here the id is the id of the reciever</span></li>
        <li><a href="#">/api/dmfsse/messages</a> <span>get list of messages onlyu admin</span></li>
        <li><a href="#">/api/dmfsse/message/id</a> <span>get a single message by id</span></li>
        <li><a href="#">/api/dmfsse/getYourMessage/id</a> <span>get the message sent to you now the id is the id of the sender</span></li>
        <li><a href="#">/api/dmfsse/getSavedMessages/id</a> <span>get saved message that you chat with yourself the id is your id</span></li>
        <li><a href="#">/api/dmfsse/message/id</a> <span>delete message if you are the owner or admin</span></li>
        <li><a href="#">/api/dmfsse/message/:id</a> <span>update message if you are the owner or admin</span></li>

        </ul>

        <h3>Rating</h3>

        <ul>
        <li><a href="#">/api/dmfsse/rate/sellerId/productId</a> <span>rate the product and the product owner only if you buy a product and pay the price</span></li>
        <li><a href="#">/api/dmfsse/rate/:productOwnerId</a> <span>get your average rate </span></li>
        <li><a href="#">/api/dmfsse/productOwnerPreviousRate/sellerId</a> <span>get the seller previous rate and feedback</span></li>
        <li><a href="#">/api/dmfsse/rate/:id</a> <span>delete the rate, only the rate owner or admin can do this</span></li>
        <li><a href="#">/api/dmfsse/rate/:id</a> <span>update the rate, only the rate owner or admin can do this</span></li>

        </ul>

        <h3>Order a Product</h3>
        <ul>
        <li><a href="#">/api/dmfsse/order/productId</a> <span>add order using product id</span></li>

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
