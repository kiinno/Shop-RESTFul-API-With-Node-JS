const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const categoryRouter = require("./api/categoryRouter");
const ApiError = require("./utils/apiError");
const app = express();

// Load Env Configs
dotenv.config({
  path: "./config/config.env",
});

const dbConnection = require("./config/database");

// Setup HTTP-Req Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("short"));
  console.info(`Development Mode Is 'On' HTTP-Req Logger Is Working`);
} else {
  app.disable("x-powered-by");
}

// Enable CORS & body-parser
app.use(cors(), express.json());

// Mount Routes
app.use("/api/v1/categories", categoryRouter);

// Not Found Routes Handler
app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this path ${req.path}`, 400));
});

// Custom Error Handler
app.use((error, req, res, _) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (_) => {
  console.log(`Server Is Running On Port ${PORT}`);
});
