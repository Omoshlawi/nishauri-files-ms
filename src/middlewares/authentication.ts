import config from "config";
import { NextFunction, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserRequest } from "../shared/types";
// import UserRepository from "../features/auth/data/respositories/UserRepository";

const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token)
    return res.status(401).json({ detail: "Unauthorized - Missing token" });
  try {
    const decoded: any = jwt.verify(token, config.get("jwt"));
    const userId = decoded._id;
    // const user = await UserRepository.getUserProfileByToken(token);
    // if (userId != user._id)
    //   return res.status(401).json({ detail: "Unauthorized - Invalid token" });
    // req.user = user;
    return next();
  } catch (err: any) {
    console.error(`[x]Error aithenticating user: `, err);
    if (err.status && err.status !== 401) {
      return res.status(err.status).json(err.errors);
    }
    if (err instanceof TokenExpiredError) {
      // Send to logger
    }
    res.status(401).json({ detail: "Unauthorized - Invalid token" });
  }
};

export default authenticate;
