const io = require("socket.io")(3095, {
  cors: {
    origin: "http://localhost:3090",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("연결되었습니다.");
});
