// ----------------------------Imports-------------------------------
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { CustomError } from "./utils/error";
import { corsConfig } from "./utils";
import { authRouter } from "./routes/auth/authRoutes";
import { calendarRouter } from "./routes/calendar/calendarRoutes";
// -------------------------------------------------------------------

// Routes Imports

// ------------------------------------------------------------------
export const app: express.Application = express();

// --------------------------CORS HANDLING---------------------------
app.use(cors(corsConfig)); // handling the cross origin resource sharing
// ------------------------------------------------------------------

// ---------------------------MIDDLEWARES----------------------------
app.use(morgan("dev")); // logs the incoming request
app.use(cookieParser()); // parses the incoming cookie
app.use(express.json()); // parses the incoming json data
// ------------------------------------------------------------------

// ------------------------------ROUTES------------------------------
const versionOne = (route: string) => {
  return `/api/v1/${route}`;
};

// handling the requests with no parameters or invalid parameters
app.all(["/", "/api", "/api/v1"], (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Event Calendar" });
  return;
});

app.use(versionOne("auth"), authRouter); // authRouter
app.use(versionOne("calendar"), calendarRouter); // calendarRouter

// -------------------------------------------------------------------

// --------------------------ERROR HANDLING---------------------------
app.all("*", (req, res, next) => {
  next(new CustomError(`No such ${req.originalUrl} url exists`, 404));
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message, error.stack);
    error.statusCode = error.statusCode ?? 500;
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: error.status,
      success: false,
      message: error.message,
    });
    return;
  }
);
// -------------------------------------------------------------------
