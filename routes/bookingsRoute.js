const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51JtG4sHWKYEE9K0Y24PKqbUCc8sJ2l8Jhc01Ng6HkHGqVH6M78SvFcUY0PAyLqBBTCRhBlcuQ1uxRtyI59f1V7rQ00MTUmi9Uu"
);

// Create API endpoint bookroom
router.post("/bookroom", async (req, res) => {
  const {
    room,
    roomid,
    userid,
    checkInDate,
    checkOutDate,
    totalAmount,
    totalNights,
    token,
  } = req.body;

  // Create new custome object
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Create Stripe payment object with a generated idempotency key
    const payment = await stripe.charges.create(
      {
        amount: totalAmount,
        customer: customer.id,
        currency: "USD",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      // Create new room booking object
      try {
        const newBooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          checkInDate: moment(checkInDate).format("MM-DD-YYYY"),
          checkOutDate: moment(checkOutDate).format("MM-DD-YYYY"),
          totalAmount,
          totalNights,
          transactionId: "1234",
        });

        // Save new room booking
        const booking = await newBooking.save();

        // Find room with same id as the new room booking
        const tempRoom = await Room.findOne({ _id: room._id });

        // Add new room booking to tempRoom.currentbookings array list
        tempRoom.currentbookings.push({
          bookingid: booking._id,
          checkInDate: moment(checkInDate).format("MM-DD-YYYY"),
          checkOutDate: moment(checkOutDate).format("MM-DD-YYYY"),
          userid: userid,
          status: booking.status,
        });

        // Save new room booking to tempRoom.currentbookings array list
        await tempRoom.save();
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }

    res.send("Payment Successful, Your Room is Booked!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Create API 'getbookingsbyuserid' endpoint
router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  /* Post request to get all room bookings with the same user id as in request body */
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingid });

    bookingItem.status = "cancelled";

    await bookingItem.save();

    const room = await Room.findOne({ _id: roomid });

    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = temp;

    await room.save();

    res.send("Booking has been Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
