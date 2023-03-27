/**
 * @desc Custom Api Error Response
 * @args [message, statusCode]
 * @note If statusCode From 400-499 ApiError.status will be return 'fail' else 'error'
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
  }
}
module.exports = ApiError;
