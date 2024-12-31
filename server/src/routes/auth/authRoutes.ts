// ----------------Imports----------------
import { Router } from "express";
import { googleLogin } from "../../controllers/auth/authController";
import { verifyToken } from "../../middlewares/auth/verifyToken";

// ----------------------------------------
const authRouter = Router();

// ----------------------------------------
// google-login
authRouter.route("/google-login").post(googleLogin);

// ----------------------------------------
export { authRouter };
