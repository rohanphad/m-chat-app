const express = require("express");
const { chats } = require("./data/data.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept JSON Data

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   console.log("API is running");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//------------Deployment------------------------------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//------------Deployment------------------------------------------------------

app.use(notFound);
app.use(errorHandler);
const server = app.listen(PORT, console.log(`server started on PORT ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000, //connection will be closed if user doesn't send message for 60 seconds
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  //creating room for each user
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  //creating room for all users present in a chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User Joined Room ${room}`);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("Iser Disconnected");
    socket.leave(userData._id);
  });
});
