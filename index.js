const express = require("express");
const database = require("./config/database");
const routesApiVer1 = require("./api/v1/admin/routes/index.route");
const routesApiVer1Client = require("./api/v1/client/routes/index.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const API_CLIENT = process.env.API_CLIENT

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  transports: ['polling'], // Chỉ sử dụng long polling thay vì WebSocket
});

// Kết nối đến cơ sở dữ liệu
database.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Thoát nếu không kết nối được với DB
  });

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true, 
}));
app.use(cookieParser());

routesApiVer1(app);
routesApiVer1Client(app);

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id); // Log id của socket kết nối
  socket.on("order", (data) => {
    if (!data || !data.product || !data.phoneNumber) {
      console.error("Invalid order data received");
      return;
    }

    console.log("Order received:", data);

    io.emit("orderNotification", {
      message: `Đơn đặt hàng: <b>${data.product}</b> từ số điện thoại: <b>${data.phoneNumber}</b>`,
      time: new Date(),
    });
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = io;
