const express = require("express");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();

// data sanitization against XSS
app.use(xss());

// limiting requests
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in some time",
});
app.use(limiter);

app.use(morgan("dev"));

// serving static pages
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening to the port: ", port);
});
