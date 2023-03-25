import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function AdminBookings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getAllBookings() {
      try {
        const data = (await axios.get("/api/bookings/getallbookings")).data;

        setLoading(false);
        setBookings(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    getAllBookings();
  }, []);

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        {loading && <Loader loading={loading} />}
        <h1>Bookings</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length
              ? bookings.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.userid}</td>
                      <td>{booking.room}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookings;
