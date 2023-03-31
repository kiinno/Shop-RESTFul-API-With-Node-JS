/**
 * Short Response Error Use in Production Mode Only
 * @param {Error} err ApiError || Error || Custom Error
 * @param {Express.Response} res HTTP-req Response Object
 */
function productionErrorResponse(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err,
  });
}
/**
 * Detailed Response Error In The Development Mode
 * @param {Error} err ApiError || Error || Custom Error
 * @param {Express.Response} res HTTP-req Response Object
 */
function developmentErrorResponse(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
}
/**
 * Custom Global Error Handler
 */
module.exports = (error, req, res, _) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development")
    developmentErrorResponse(error, res);
  else productionErrorResponse(error, res);
};
