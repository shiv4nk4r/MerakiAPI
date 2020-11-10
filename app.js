const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Importing All Routes
const ApiRouter = require("./Routes/Api");

//Middleswares
dotenv.config();

//Connecting the DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

//Handling The Routes
app.use("/api", ApiRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log("Server is running"));
