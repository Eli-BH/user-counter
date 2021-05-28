const express = require("express");
const RequestIp = require("@supercharge/request-ip");
const hbs = require("hbs");

const port = process.env.PORT || 3001;
const app = express();
let ipLibrary = [];

app.set("view engine", "hbs");

const ipMiddleware = (req, res, next) => {
  req.ip = RequestIp.getClientIp(req);
  next();
};

app.get("/", ipMiddleware, (req, res) => {
  let userCount = 0;

  if (!ipLibrary.includes(req.ip)) ipLibrary.push(req.ip);

  userCount = ipLibrary.length.toString();

  res.render("page", { userCount: userCount });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
