const mongoose = require("mongoose");
const {
  DB_URI = "",
  DB_USER = "",
  DB_PASS = "",
  DB_NAME = "test",
} = process.env;

const db_uri = DB_URI.replace("<username>", DB_USER)
  .replace("<password>", DB_PASS)
  .replace("<database>", DB_NAME);

/**
 * Make Connection With Database
 * @return Connection || Error
 */
exports.dbConnection = mongoose
  .connect(db_uri)
  .then((client) => {
    console.info(`Database Connected To : ${client.connection.host}`);
  })
  .catch((client_err) => {
    console.error(`Faild To Connect to Database :\n\t${client_err}`);
    process.exit(1);
  });
