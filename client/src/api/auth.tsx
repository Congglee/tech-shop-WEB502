import { IUser } from "../interfaces/user";
import instance from "./instance";

export const login = (user: IUser) => {
  return instance.post("/login", user);
};

export const signup = (user: IUser) => {
  return instance.post("/register", user);
};
