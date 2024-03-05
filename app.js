const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongoconnection.json");
const employee=require("./modele/Employe")
var path = require("path");
mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const EmpRouter = require("./routes/Employe");
app.use("/employee", EmpRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("employess loaded");
  socket.emit("msg", "A new employess is connected");
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("msg", (data) => {
    console.log("d1" + data);
   
    io.emit("msg", data);
  });
  socket.on("disconnect", () => {
    io.emit("msg", "An employess is diconnected");
  });
});
server.listen(3000, () => console.log("server is run"));
