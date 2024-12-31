import jwt from "jsonwebtoken";

// createJwtToken -- function to create the jwt token
export const createJwtToken: (payload: Object) => string = (payload) => {
  const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};
