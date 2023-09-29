const express= require("express")
const router = express.Router();
const ProductRouter = require("../Controllers/ProductController")
router.post("/addproduct",ProductRouter.AddProduct);
router.get("/getproduct",ProductRouter.GetProducts)
router.get('/getproductbyid',ProductRouter.GetProductById)
router.delete("/deleteproduct/:id",ProductRouter.Productdlt)
router.patch("/updateproduct",ProductRouter.UpdateProducts)
module.exports = router;
