

class AppError extends Error { // Custom error class that extends the built-in Error class
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = "fail";

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
