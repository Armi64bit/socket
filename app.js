const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongoconnection.json");
const { add } = require("./controller/chatController");
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

const UserRouter = require("./routes/user");
app.use("/user", UserRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("msg", "A new user is connected");
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("msg", (data) => {
    console.log("d1" + data);
    add(data);
    io.emit("msg", data);
  });
  socket.on("disconnect", () => {
    io.emit("msg", "An user is diconnected");
  });
});
server.listen(3000, () => console.log("server is run"));
