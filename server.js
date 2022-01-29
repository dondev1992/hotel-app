const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Luxury Collentions API");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on nodemon`));
