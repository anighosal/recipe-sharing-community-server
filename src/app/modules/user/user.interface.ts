import { USER_Role, USER_STATUS } from "./user.constant";

export type TUser = {
  name: string;
  role: keyof typeof USER_Role;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
};

export type TLoginUser = {
  email: string;
  password: string;
};
