import { UserInfo } from "@/types/entities";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { setCookie, deleteCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = "/api";

export const decodeUserInfo = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64)) as UserInfo;
};

export const signIn = (token: string) => {
  const userInfo = decodeUserInfo(token);
  const { sub, email } = userInfo;

  setCookie("access_token", token);
  setCookie("user_id", sub);
  setCookie("user_email", email);

  return userInfo;
};

export const signOut = () => {
  deleteCookie("access_token");
  deleteCookie("user_id");
  deleteCookie("user_email");
};
