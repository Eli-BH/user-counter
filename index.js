const express = require("express");
const RequestIp = require("@supercharge/request-ip");
const port = process.env.PORT || 3001;
const app = express();

const ipMiddleware = (req, res, next) => {
  req.ip =
    req.headers["x-forwarded-for"]?.split(",").pop().trim() ||
    req.socket?.remoteAddress;

  next();
};

app.get("/", ipMiddleware, (req, res) => {
  res.send(`Your IP address is ${req.ip}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
