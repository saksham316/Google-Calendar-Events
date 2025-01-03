import { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | string;
      query?: {
        sync: string;
      };
    }
  }

  interface IJwtPayload {
    userId: string;
  }
}

export {};
