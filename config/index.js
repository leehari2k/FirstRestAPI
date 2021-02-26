const dotenv = require("dotenv");
const result = dotenv.config({
  path: ".env",
});
if (result.error) {
  throw result.error;
}
const { MONGODB_URI, PORT } = process.env;

exports.PORT = PORT || 8080;
exports.MONGODB_URI = MONGODB_URI;
