var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://group2_iot_lab5:K3ExK3g9OeOo3NFE@cluster0.t4hbk.mongodb.net/test",
  async (err) => {
    if (!err) {
      console.log("Connecting database... ");
    } else console.log("db error");
  }
);
app.use(express.json());
app.use(express.static(__dirname + "/views"));
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App has started at http://localhost:" + port);
});

app.use("/", express.static("./"));
app.use("/", express.static("./views/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
const sensorRouter = require("./routes/sensor");
app.use("/sensor", sensorRouter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
