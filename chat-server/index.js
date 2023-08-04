const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./MiddleWare/errorMiddleware");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to DB");
  } catch (error) {
    console.log("Server is not connect to DB", error.message);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("server is running"));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.data._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("new message", (newMessageStatus) => {
    if (newMessageStatus?.chat) {
      var chat = newMessageStatus.chat;
      if (!chat.users) {
        return console.log("chat.users not defined");
      }
      chat.users.forEach((user) => {
        if (user._id === newMessageStatus.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageStatus);
      });
    }
  });
});
