const { PORT, MONGODB_URI } = require("./config/index");
const { HTTP_STATUS_CODE } = require("./constant/index");
const passport = require('passport')
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/post.route");
const routesUser = require("./routes/user.route");
const routesAuth = require("./routes/auth.route");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use("/", routes);
app.use("/", routesUser);
app.use("/", routesAuth);

//connect to mongodb
mongoose
  .connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Ket noi thanh cong"))
  .catch((error) => console.error("Ket noi that bai: ", error));

//handle error
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = error.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => console.log(`Listen on port: ${PORT}`));
