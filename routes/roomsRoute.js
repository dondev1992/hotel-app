const express = require("express");
const router = express.Router();

const Room = require("../models/room");

// Creating a GET request to retrieve all rooms from db
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    return res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();

    res.send("Room has been added Successfully!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
