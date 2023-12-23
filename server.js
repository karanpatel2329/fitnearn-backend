const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const mongoose = require("mongoose");
const Session = require("./src/auth/model");
const app = express();
const PORT = 3000;

const router = express.Router();
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://pkaran4252:txuX2ZpS4m2TgSTW@mytripcluster.z07i7ft.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB Atlas cluster!");
    app.use(bodyParser.json());
    app.use(express.json());

    const authRouter = require("./src/auth/controller");
    app.use("/auth", authRouter);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
