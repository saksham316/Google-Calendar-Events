class CustomError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500 ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export { CustomError };
