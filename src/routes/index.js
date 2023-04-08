const apiDescriptionController = async (req, res) => {
  try {
    res.status(200).send(
       `<html >

       <div style="margin:50px;">
        <h1 style="color:green">Digital Marketing for Farmer and Small Sized Enterprises API</h1>
        <h2 style="color:green">API description and usage</h2>
        <h3 style="color:green;">Authentication</h3>
        <ul>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/signup</a>  <span style="font-size:20; color:green;">to signup as farmer, sse or customer</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/register</a> <span style="font-size:20; color:green;">to add Agent and Admin</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/signin</a> <span style="font-size:20; color:green;">to login as a user, password and phone number required</span></li>
            
        </ul>
        <h3 style="color:green;">Product</h3>
        <ul>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/addProduct</a> <span style="font-size:20; color:green;">add product to sell</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/products</a> <span style="font-size:20; color:green;">get list of products</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/product/id</a> <span style="font-size:20; color:green;">get a single product by id</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/myProduct/id</a> <span style="font-size:20; color:green;">get the product posted by you</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/product/id</a> <span style="font-size:20; color:green;">delete a product if you are owner of the product or admin</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/product/id</a> <span style="font-size:20; color:green;">delete a product if you are owner of the product or admin</span></li>
        </ul>
        <h3 style="color:green;">User Account</h3>
        <ul>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/user/id</a> <span style="font-size:20; color:green;">get your profile information</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/users</a> <span style="font-size:20; color:green;">get list of user only admin</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/allFarmers</a> <span style="font-size:20; color:green;">get list of farmers only agent</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/user/id</a> <span style="font-size:20; color:green;">delete your account only account owner and admin can do this</span></li>
            <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/user/id</a> <span style="font-size:20; color:green;">update your account only account owner and admin can do this</span></li>
        </ul>

        <h3 style="color:green;">Training</h3>
        <ul>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/addTraining</a> <span style="font-size:20; color:green;">add training if only admin</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/trainings</a> <span style="font-size:20; color:green;">get list of trainings</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/training/id</a> <span style="font-size:20; color:green;">get single training</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/training/id</a> <span style="font-size:20; color:green;">delete training only admin </span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/training/id</a> <span style="font-size:20; color:green;">update training only admin</span></li>
        </ul>

        <h3 style="color:green;">Comment Training</h3>
        <ul>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/comment/trainingId</a> <span style="font-size:20; color:green;">add comment to training</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/comments</a> <span style="font-size:20; color:green;">get list of comments</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/comment/commentId</a> <span style="font-size:20; color:green;">get single comment</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/singleProductComments/trainingId</a> <span style="font-size:20; color:green;">get list of comment for a given training</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/comment/commentId</a> <span style="font-size:20; color:green;">delete comment only comment owner and admin</span></li>
          <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/comment/commentId</a> <span style="font-size:20; color:green;">update comment only comment owner and admin</span></li>
        </ul>

        <h3 style="color:green;">Message</h3>
        <ul>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/message/id</a> <span style="font-size:20; color:green;">send message to user with id number id. here the id is the id of the reciever</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/messages</a> <span style="font-size:20; color:green;">get list of messages onlyu admin</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/message/id</a> <span style="font-size:20; color:green;">get a single message by id</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/getYourMessage/id</a> <span style="font-size:20; color:green;">get the message sent to you now the id is the id of the sender</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/getSavedMessages/id</a> <span style="font-size:20; color:green;">get saved message that you chat with yourself the id is your id</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/message/id</a> <span style="font-size:20; color:green;">delete message if you are the owner or admin</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/message/:id</a> <span style="font-size:20; color:green;">update message if you are the owner or admin</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/connectedUserList</a> <span style="font-size:20; color:green;">get a list of user you talked</span></li>

        </ul>
        

        <h3 style="color:green;">Rating</h3>

        <ul>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/rate/sellerId/productId</a> <span style="font-size:20; color:green;">rate the product and the product owner only if you buy a product and pay the price</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/rate/:productOwnerId</a> <span style="font-size:20; color:green;">get your average rate </span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/productOwnerPreviousRate/sellerId</a> <span style="font-size:20; color:green;">get the seller previous rate and feedback</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/rate/:id</a> <span style="font-size:20; color:green;">delete the rate, only the rate owner or admin can do this</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/rate/:id</a> <span style="font-size:20; color:green;">update the rate, only the rate owner or admin can do this</span></li>

        </ul>

        <h3 style="color:green;">Order a Product</h3>
        <ul>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/order/productId</a> <span style="font-size:20; color:green;">order a product  </span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/orders</a> <span style="font-size:20; color:green;">get list of orders only admin can do this</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/order/id</a> <span style="font-size:20; color:green;">get a single order only order owner and product owner can get</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/myOrders</a> <span style="font-size:20; color:green;">get list of your own order</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/myOffers</a> <span style="font-size:20; color:green;">get list of your product offer</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/order/id</a> <span style="font-size:20; color:green;">delete the order by id, its done by order owner, admin and when the product is deleted</span></li>
        <li><a style="color:blue; font-size:25px"href="#">/api/dmfsse/order/id</a> <span style="font-size:20; color:green;">update the order by id, its done by order owner, admin and offer reciever</span></li>

        </ul>

        <h3 style="color:green;">Payment</h3>
        <ul> 
         <li><a style="color:blue; font-size:25px "href="#">/api/dmfsse/<a> <span style="font-size:20; color:green;"></span></li>

        </ul>
        </div>

        <div style="height:300px"></div>

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
