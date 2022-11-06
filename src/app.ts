import cookieParser from "cookie-parser";
import createError from "http-errors";
import express, { ErrorRequestHandler } from "express";
import logger from "morgan";
import path from "path";
import sassMiddleware from "node-sass-middleware";

import channelRouter from "./routes/channel";
import fileRouter from "./routes/file";
import indexRouter from "./routes/index";
import watchRouter from "./routes/watch";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "../public"),
    dest: path.join(__dirname, "../public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/channel", channelRouter);
app.use("/file", fileRouter);
app.use("/file", express.static(path.join(__dirname, "../videos")));
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
