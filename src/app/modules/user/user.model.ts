/* eslint-disable @typescript-eslint/no-this-alias */

import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";
import config from "../../config";
import { USER_Role, USER_STATUS } from "./user.constant";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.keys(USER_Role),
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: 0,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: Object.keys(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
  passwordChangedAt: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

export const User = model<TUser>("User", userSchema);
