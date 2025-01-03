import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// createJwtToken -- function to create the jwt token
export const createJwtToken: (
  payload: Object,
  secret?: string,
  expiry?: string
) => string = (payload, secret, expiry) => {
  const jwtSecret = secret
    ? secret
    : process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : "";
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: expiry ? expiry : process.env.JWT_EXPIRY,
  });
  return token;
};

// verifyJwtToken -- function to verify the jwt token
export const verifyJwtToken = (
  token: string,
  secret: string
): void | JwtPayload => {
  if (token && secret) {
    jwt.verify(
      token,
      secret,
      (
        error: VerifyErrors | null,
        payload: JwtPayload | undefined | string
      ) => {
        if (error) {
          console.log("Error!" + error.message);
          return;
        } else {
          if (payload) {
            return payload;
          }
        }
      }
    );
  }
};
