import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Tag } from "antd";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  });
  return (
    <div className="mx-5 mt-5" style={{ height: "100vh" }}>
      <Tabs defaultActiveKey="1" className="bs">
        <TabPane tab="Profile" key="1">
          <h1 id="tab1">My Profile</h1>

          <br />

          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>isAdmin:</b> {user.isAdmin ? "YES" : "NO"}
          </p>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function bookingsByUserId() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/bookings/getbookingsbyuserid/", {
            userid: user._id,
          })
        ).data;
        setLoading(false);
        console.log(data);
        setBookings(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    bookingsByUserId();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      setLoading(false);
      console.log(result);
      Swal.fire(
        "Congratulations",
        "Your Reservation has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
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
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader loading={loading} />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs" key={booking._id}>
                  <div>
                    <h1>{booking.room}</h1>
                    <p>
                      <b>Booking Id:</b> {booking._id}
                    </p>
                    <p>
                      <b>Check In:</b> {booking.checkInDate}
                    </p>
                    <p>
                      <b>Check Out:</b> {booking.checkOutDate}
                    </p>
                    <p>
                      <b>Amount:</b>{" "}
                      {formatToCurrency(
                        booking.totalAmount / 100 +
                          (booking.totalAmount * 0.075) / 100
                      )}
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      {booking.status === "cancelled" ? (
                        <Tag color="red">
                          <b>CANCELLED</b>
                        </Tag>
                      ) : (
                        <Tag color="green">
                          <b>CONFIRMED</b>
                        </Tag>
                      )}
                    </p>
                  </div>

                  {booking.status !== "cancelled" && (
                    <div className="text-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
