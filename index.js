const express = require("express");
require("hbs");
const requestIp = require("request-ip");

const port = process.env.PORT || 3001;
const app = express();
let ipLibrary = [];

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

const ipMiddleware = (req, res, next) => {
  req.ip = requestIp.getClientIp(req);
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
