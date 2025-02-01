/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import config from "../../config";
import { USER_Role } from "../user/user.constant";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.util";

const register = async (payload: TUser): Promise<any> => {
  // Check if user exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Set default role
  payload.role = USER_Role.USER;

  // Create user
  const newUser = await User.create(payload);
  return newUser;
};

const login = async (payload: TLoginUser) => {
  // Validate input
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }

  // Fetch user and include password
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("Password is missing in the database");
  }

  if (user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }

  // Compare passwords
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );
  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  // Generate JWT tokens
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  if (!config.jwt_access_secret || !config.jwt_refresh_secret) {
    throw new Error("JWT secret keys are missing in the config file");
  }

  if (!config.jwt_access_expires_in || !config.jwt_refresh_expires_in) {
    throw new Error("JWT expiration times are missing in the config file");
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: String(config.jwt_access_expires_in),
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: String(config.jwt_refresh_expires_in),
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  register,
  login,
};
