const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// dotenv configiration
dotenv.config({ path: "./config.env" });

// database connection
const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connected successfully..!");
  });

// server connection
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
