import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  uploadImagesProducts,
} from "../controllers/product";
import uploadCloud from "../config/cloudinary.config";

const router = express.Router();

router.post(
  "/products",
  [verifyAccessToken, isAdmin],
  uploadCloud.array("images", 10),
  createProduct
);
router.get("/products", getProducts);
router.get("/products/:pid", getProduct);
router.put("/products/:pid", [verifyAccessToken, isAdmin], updateProduct);
router.put(
  "/products/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploadCloud.array("images", 10),
  uploadImagesProducts
);
router.delete("/products/:pid", [verifyAccessToken, isAdmin], deleteProduct);

export default router;
