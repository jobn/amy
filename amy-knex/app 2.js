var express = require("express");
var logger = require("morgan");

var questionRouter = require("./routes/question");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/question", questionRouter);

module.exports = app;
