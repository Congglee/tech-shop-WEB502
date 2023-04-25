import User from "../models/user";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateAccessToken, generateRefreshToken } from "../middlewares/jwt";

const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !lastname || !firstname)
      return res.status(400).json({
        success: false,
        mes: "Missing inputs",
      });

    const user = await User.findOne({ email: email });
    if (user) throw new Error("User has existed!");
    else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        success: newUser ? true : false,
        mes: newUser
          ? "Register is successfully. Please go login"
          : "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        mes: "Missing inputs",
      });

    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
      const { password, role, refreshToken, ...userData } = response.toObject();

      const accessToken = generateAccessToken(response._id, role);
      const newRefreshToken = generateRefreshToken(response._id);

      await User.findByIdAndUpdate(
        response._id,
        {
          refreshToken: newRefreshToken,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        accessToken,
        userData,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-refreshToken -password");
    return res.status(200).json({
      success: user ? true : false,
      result: user ? user : "User not found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.find().select("-password -refreshToken");
    return res.status(200).json({
      success: response ? true : false,
      users: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0)
      throw new Error("Missing inputs");

    const response = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-password -refreshToken");

    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Something went wrong",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const updateUserByAdmin = async (req, res) => {
  try {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");

    const response = await User.findByIdAndUpdate(uid, req.body, {
      new: true,
    }).select("-password -refreshToken");

    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Something went wrong",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) throw new Error("Missing inputs");

    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
      success: response ? true : false,
      deletedUser: response
        ? `User with email ${response.email} deleted`
        : "No user deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

export {
  register,
  login,
  getCurrentUser,
  getUsers,
  updateUser,
  updateUserByAdmin,
  deleteUser,
};
