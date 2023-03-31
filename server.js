const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Load Env Configs
dotenv.config({
  path: "./config/config.env",
});

const dbConnection = require("./config/database");
const errorHandlerMiddleware = require("./middlewares/globalError");
const ApiError = require("./utils/apiError");
const categoryRouter = require("./api/categoryRouter");
const subCategoryRouter = require("./api/subCategory.route");
const brandRouter = require("./api/brandRouter");
const productRouter = require("./api/product.route");

// Setup HTTP-Req Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("short"));
  console.info(`Development Mode Is 'On' HTTP-Req Logger Is Working`);
} else {
  app.disable("x-powered-by");
  console.info(`Production Mode Is 'On'`);
}

// Enable CORS & body-parser
app.use(cors(), express.json());

// Mount Routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);

// Not Found Routes Handler
app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this rotue ${req.originalUrl}`, 400));
});

// Custom Error Handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, (_) => {
  console.log(`Server Is Running On Port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error(
    "\x1b[31m",
    `UnhandledRejectionError ${error.name} : ${error.message}`,
    "\x1b[0m"
  );
  console.log("Shutting Down...");
  server.close((server_errrors) => {
    process.exit(1);
  });
});
