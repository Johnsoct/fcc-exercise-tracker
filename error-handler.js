function errorHandler (err, req, res, next) {
        const statusCode = err.statusCode || 500

        res
                .status(statusCode)
                .json({
                        error: err.stack,
                        message: err.message || 'An internal server error occurred',
                })
}

module.exports = errorHandler
