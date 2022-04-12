import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import moment from "moment";
import RoomItem from "../components/RoomItem";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import "../App.css";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [type, setType] = useState("all");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("api/rooms/getallrooms")).data;

        setRooms(data);
        setDuplicateRooms(data);

        setLoading(false);
      } catch (error) {
        setError(true);

        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    setCheckInDate(moment(dates[0]).format("MM-DD-YYYY"));
    setCheckOutDate(moment(dates[1]).format("MM-DD-YYYY"));

    var tempRooms = [];
    var availability = false;
    for (const room of duplicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
              booking.checkInDate,
              booking.checkOutDate
            ) &&
            !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
              booking.checkInDate,
              booking.checkOutDate
            )
          ) {
            if (
              moment(dates[0]).format("MM-DD-YYYY") !== booking.checkInDate &&
              moment(dates[0]).format("MM-DD-YYYY") !== booking.checkOutDate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.checkInDate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.checkOutDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        tempRooms.push(room);
      }

      setRooms(tempRooms);
      console.log(tempRooms);
    }
  }

  function filterBySearch() {
    const filterRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    setRooms(filterRooms);
  }

  function filterByType(e) {
    setType(e);

    if (e === "all") {
      setRooms(duplicateRooms);
    } else {
      const filtertype = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );

      setRooms(filtertype);
    }
  }

  function enabled() {
    if (!user) {
      window.location.href = "/login";
    }
  }

  return (
    <div className="container" style={{ height: "200vh" }}>
      <div className="row mt-3 px-1 bs justify-content-center">
        <div className="col-md-3">
          <RangePicker
            format="MM-DD-YYYY"
            onChange={filterByDate}
            allowClear="false"
            onCalendarChange={enabled}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setsearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" key={room._id}>
                <RoomItem
                  key={room._id}
                  room={room}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
