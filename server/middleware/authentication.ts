import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // if you want to skip any APIs put them here.

  if ((req.path === "/auth" || req.path === "/user") && req.method == "POST")
    return next();

  const splitAuth = req.headers.authorization?.split(" ");

  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];

  if (token) {
    try {
      const tokenVerified = jwt.verify(
        token,
        req.path === "/authentication/refresh"
          ? "refreshJWTSecret"
          : "accessJWTSecret"
      );

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;
        return next();
      }
    } catch (e) {
      console.log(`Token expired for user ${token.sub}`);
    }
  }
  return res.sendStatus(401);
};

module.exports = {
  verifyToken,
};
