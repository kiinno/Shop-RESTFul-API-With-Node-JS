const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Load Env Configs
dotenv.config({
  path: "./config/config.env",
});

// Import Auxalaris
const dbConnection = require("./config/database");
const errorHandlerMiddleware = require("./middlewares/globalError");
const ApiError = require("./utils/apiError");

// Import Routers
const categoryApp = require("./routers/category.router");
const subCategoryApp = require("./routers/sub-category.route");
const brandApp = require("./routers/brand.router");
const productApp = require("./routers/product.route");

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
app.use("/api/v1/categories", categoryApp);
app.use("/api/v1/subcategories", subCategoryApp);
app.use("/api/v1/brands", brandApp);
app.use("/api/v1/products", productApp);

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
