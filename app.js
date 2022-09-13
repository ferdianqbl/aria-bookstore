const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authRouter = require("./app/api/auth/router");
const categoriesRouter = require("./app/api/categories/router");
const booksRouter = require("./app/api/books/router");
const uploadsRouter = require("./app/api/uploads/router");
const checkoutRouter = require("./app/api/checkout/router");
const transactionsRouter = require("./app/api/transactions/router");
const URL = "/api/v1";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Aria Bookstore" });
});

app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, uploadsRouter);
app.use(`${URL}`, checkoutRouter);
app.use(`${URL}`, transactionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("404");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
