import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function AdminRooms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getAllRooms() {
      try {
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setLoading(false);
        setRooms(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    getAllRooms();
  }, []);

  const formatToCurrency = (amount) => {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        {loading && <Loader />}
        <h1>Rooms</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Amount per Night</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{formatToCurrency(room.rentperday / 100)}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminRooms;
