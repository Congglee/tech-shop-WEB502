import mongoose from "mongoose"; // Erase if already required
import bcrypt from "bcrypt";
import crypto from "crypto";

// Declare the Schema of the Mongo model

// Định nghĩa cấu hình dữ liệu một model user sẽ bao gồm có trường và kiểu dữ liệu, ...
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    // Sử dụng để lưu token thay đổi password
    passwordResetToken: {
      type: String,
    },
    // Thời gian còn hạn của token thay đổi password
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

export default mongoose.model("User", userSchema);
