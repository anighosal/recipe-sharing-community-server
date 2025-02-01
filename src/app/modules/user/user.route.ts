/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { userControllers } from "./user.controller";

import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_Role } from "./user.constant";
import { UserValidations } from "./user.validation";
const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdminValidations),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userControllers.createAdmin
);

//update
router.put(
  "/:userId",
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  validateRequest(UserValidations.updateUserValidations),
  userControllers.updateUser
);

export const UserRoutes = router;
