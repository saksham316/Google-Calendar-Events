// nodeEnv - node environment
export const nodeEnv = process.env.NODE_ENV === "development" ? "dev" : "prod";
// allowedOrigin - whitelisted origins
const allowedOrigin: string =
  nodeEnv === "dev"
    ? process.env.REACT_APP_DEV_ALLOWED_ORIGIN
      ? process.env.REACT_APP_DEV_ALLOWED_ORIGIN
      : ""
    : process.env.REACT_APP_DEV_ALLOWED_ORIGIN
    ? process.env.REACT_APP_DEV_ALLOWED_ORIGIN
    : "";

// CORS CONFIG
export const corsConfig =
  nodeEnv === "dev"
    ? {
        origin: [allowedOrigin],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      }
    : {
        origin: [allowedOrigin],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      };

//
