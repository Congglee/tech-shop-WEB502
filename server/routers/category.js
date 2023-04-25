import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category";

const router = express.Router();

router.post("/categories", [verifyAccessToken, isAdmin], createCategory);
router.get("/categories", getCategories);

router.get("/categories/:pcid", getCategory);

router.put("/categories/:pcid", [verifyAccessToken, isAdmin], updateCategory);
router.delete(
  "/categories/:pcid",
  [verifyAccessToken, isAdmin],
  deleteCategory
);

export default router;
