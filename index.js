const express = require("express");
const RequestIp = require("@supercharge/request-ip");
const port = process.env.PORT || 3001;
const app = express();

let ipLibrary = [];

const ipMiddleware = (req, res, next) => {
  req.ip = RequestIp.getClientIp(req);

  next();
};

app.get("/", ipMiddleware, (req, res) => {
  if (ipLibrary.includes(req.ip)) return res.send(ipLibrary.length);

  ipLibrary.push(req.ip);

  res.send(ipLibrary.length.toString());
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
