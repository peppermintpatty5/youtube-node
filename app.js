const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const fileRouter = require("./routes/file");
const indexRouter = require("./routes/index");
const watchRouter = require("./routes/watch");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/file", fileRouter);
app.use("/file", express.static(path.join(__dirname, "videos")));
app.use("/watch", watchRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
