require("dotenv").config();
require("hbs");
const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const Count = require("./models/Count");

const port = process.env.PORT || 3001;
const app = express();
let ipLibrary = [];

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const ipMiddleware = (req, res, next) => {
  req.ip = requestIp.getClientIp(req);
  next();
};

app.get("/", ipMiddleware, async (req, res) => {
  try {
    const existingIp = await Count.findOne({ ip: req.ip });
    if (!existingIp) await new Count({ ip: req.ip }).save();

    const ipAmt = await Count.countDocuments();

    res.render("page", { userCount: ipAmt });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
