const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getMyProduct } = require("../controllers/product/product.controller");
const { verifyToken, isAdmin, isSse } = require("../middlewares/auth/authJwt");
const { changeProduct, canAddProduct } = require("../middlewares/product/product.middleware");

const productRoute = (app) => {
    const router = require("express").Router();

    router.post("/addProduct",[verifyToken, canAddProduct], addProduct)
    router.get("/products",[verifyToken], getAllProducts)
    router.get("/product/:id",[verifyToken],getProduct)
    router.get("/myProduct/",[verifyToken],getMyProduct)
    router.patch("/product/:id",[verifyToken, changeProduct],updateProduct)
    router.delete("/product/:id",[verifyToken, changeProduct],deleteProduct)

    app.use("/api/dmfsse", router)
}

module.exports = productRoute