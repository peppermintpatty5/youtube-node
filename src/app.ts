import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import db from "./db";
import { initModels } from "./models";
import channelRouter from "./routes/channel";
import indexRouter from "./routes/index";
import thumbnailRouter from "./routes/thumbnail";
import videoRouter from "./routes/video";
import watchRouter from "./routes/watch";

initModels(db);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// serve Bootstrap files
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
// serve compiled CSS files
app.use("/stylesheets", express.static(path.join(__dirname, "css")));

app.use("/", indexRouter);
app.use("/channel", channelRouter);
app.use("/thumbnail", thumbnailRouter);
app.use("/video", videoRouter);
app.use("/watch", watchRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}) as ErrorRequestHandler);

export default app;
