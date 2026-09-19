const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddleware")
const {admin}=require("../middleware/adminMiddleware")
const multer=require("multer")
const upload=multer({dest:'uploads/'})
const {getProducts,getProductsById,createProduct,deleteProduct,getProductsByCategory,updateProduct}=require("../controller/productController")
router.route("/")
  .get(getProducts)
  .post(protect,admin,upload.single("image"), createProduct);
router.get("/category/:category", getProductsByCategory);
router.route("/:id").get(getProductsById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct);
module.exports=router;

  