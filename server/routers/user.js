import express from "express";
import {
  deleteUser,
  getCurrentUser,
  getUsers,
  login,
  register,
  updateUser,
  updateUserByAdmin,
} from "../controllers/user";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users/current", verifyAccessToken, getCurrentUser);

router.delete("/users", [verifyAccessToken, isAdmin], deleteUser);
router.get("/users", [verifyAccessToken, isAdmin], getUsers);
router.put("/users/current", [verifyAccessToken], updateUser);
router.put(
  "/users/admin/:uid",
  [verifyAccessToken, isAdmin],
  updateUserByAdmin
);

export default router;
