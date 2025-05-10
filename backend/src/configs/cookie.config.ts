import { CookieOptions } from "express";
import { ENV } from "./env.config";

const isProduction = ENV.IS_PRODUCTION;

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
};
