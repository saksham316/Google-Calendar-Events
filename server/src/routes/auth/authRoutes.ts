// ----------------Imports----------------
import { Router } from "express";
import { googleLogin } from "../../controllers/auth/authController";

// ----------------------------------------
const authRouter = Router();

// ----------------------------------------
// google-login
authRouter.route("/google-login").post(googleLogin);

// ----------------------------------------
export { authRouter };
