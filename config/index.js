const dotenv = require("dotenv");
const result = dotenv.config({
  path: ".env",
});
if (result.error) {
  throw result.error;
}
const {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

exports.JWT_SECRET = JWT_SECRET;
exports.PORT = PORT || 8080;
exports.MONGODB_URI = MONGODB_URI;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
