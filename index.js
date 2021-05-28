const express = require("express");
const RequestIp = require("@supercharge/request-ip");
const port = 3001;
const app = express();

const ipMiddleware = (req, res, next) => {
  req.ip = RequestIp.getClientIp(req);

  next();
};

app.get("/", ipMiddleware, (req, res) => {
  res.send(req.ip);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
