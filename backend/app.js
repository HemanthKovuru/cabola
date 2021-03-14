const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes");
const rideRouter = require("./routes/rideRoutes");

// middlewares
app.use(cors());

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rides", rideRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.all("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// global error handler
app.use((err, req, res, next) => {
  err.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
