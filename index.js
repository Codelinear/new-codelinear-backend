const express = require("express");
const session = require("express-session");
const cors = require("cors");
const compression = require("compression");
const { router } = require("./routes/routes");
const path = require("path");

const app = express();
const sessionMiddleware = session({
  secret: "rewvtgreytbryjjgbn6yr",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
});

process.on("exit", () => {
  console.log("Exiting...");
  server.close(() => {
    console.log("Server closed");
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
