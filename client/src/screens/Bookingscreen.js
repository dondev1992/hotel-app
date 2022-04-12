import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 500,
});

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();

  // const roomid = match.params.roomid;
  const checkInDate = moment(match.params.checkInDate, "MM-DD-YYYY");
  const checkOutDate = moment(match.params.checkOutDate, "MM-DD-YYYY");

  const totalNights = moment.duration(checkOutDate.diff(checkInDate)).asDays();

  useEffect(() => {
    //Retreive user and selected room data
    async function fetchData() {
      if (!localStorage.getItem("currentUser")) {
        window.location.reload = "/login";
      }

      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        setRoom(data);
        setTotalAmount(data.rentperday * totalNights);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      checkInDate,
      checkOutDate,
      totalAmount,
      totalNights,
      token,
    };

    try {
      setLoading(true);
      const result = (
        await axios.post("/api/bookings/bookroom", bookingDetails)
      ).data;
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room has been Booked Successfully",
        "success"
      ).then(() => {
        window.location.href = "/bookings";
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire("Unfortunately", "Something went wrong", "error");
    }
  }

  const formatToCurrency = (amount) => {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        room && (
          <div className="col-md-12" data-aos="flip-left">
            <div className="row mt-5 bs">
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} alt="room" className="bigimg" />
              </div>
              <div
                className="col-md-6"
                style={{ textAlign: "right", paddingLeft: "2rem" }}
              >
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>Check In Date: {match.params.checkInDate}</p>
                  <p>Check Out Date: {match.params.checkOutDate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
                <br />
                <br />
                <div style={{ textAlign: "right" }}>
                  <b>
                    <h1>Amount</h1>
                    <hr />
                    <p>Total Nights: {totalNights}</p>

                    <p>
                      Amount per Night:{" "}
                      {formatToCurrency(room.rentperday / 100)}
                    </p>
                    <p style={{ fontSize: 12 }}>
                      Sub Total: {formatToCurrency(totalAmount / 100)}
                    </p>
                    <p style={{ fontSize: 12 }}>
                      Tax: {formatToCurrency((totalAmount * 0.075) / 100)}
                    </p>
                    <p>
                      Total Amount:{" "}
                      {formatToCurrency(
                        totalAmount / 100 + (totalAmount * 0.075) / 100
                      )}
                    </p>
                  </b>
                </div>
                <div style={{ float: "right" }}>
                  <StripeCheckout
                    token={onToken}
                    currency="USD"
                    shippingAddress
                    amount={totalAmount}
                    stripeKey="pk_test_51JtG4sHWKYEE9K0Y7yBBHQN4MT3E0DfcUOelcHevjC4NKeAxeC5fXIaQjRwxddvNTNMVjvOIgrSYbskuzbsA06SL00jnXVEydT"
                  >
                    <button className="btn btn-primary">Pay Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Bookingscreen;
