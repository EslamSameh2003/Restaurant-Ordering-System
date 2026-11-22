
const validationMiddleware = (schema, source = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            allowUnknown: false
        });

        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message)
            });
        }

        req[source] = value;
        next();
    };
};

export default validationMiddleware;
