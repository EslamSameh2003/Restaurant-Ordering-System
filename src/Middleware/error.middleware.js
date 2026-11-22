const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.name === "SequelizeUniqueConstraintError"
        ? 409
        : (err.statusCode || 500);

    res.status(statusCode).json({
        status: err.status || "error",
        message: err.message || "Internal server error",
    });
};

export default errorHandler;