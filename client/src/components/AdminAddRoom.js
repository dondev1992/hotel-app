import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

function AdminAddRoom() {
  const [name, setName] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [type, setType] = useState("");
  const [imageurl1, setImageurl1] = useState("");
  const [imageurl2, setImageurl2] = useState("");
  const [imageurl3, setImageurl3] = useState("");

  const [loading, setLoading] = useState(false);

  async function addRoom() {
    const newRoom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/rooms/addroom", newRoom).data;
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Congrats",
        "Your New Room has been added Successfully!",
        "success"
      );
      // ).then((result) => (window.location.href = ""));
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Sorry", "Something Went Wrong", "error");
    }
  }

  return (
    <div className="row mt-2">
      {loading && <Loader />}

      <h1>Add Room</h1>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="price per night"
          value={rentperday}
          onChange={(e) => {
            setRentperday(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="max count"
          value={maxcount}
          onChange={(e) => {
            setMaxcount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="phone number"
          value={phonenumber}
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
        />
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="image URL #1"
          value={imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="image URL #2"
          value={imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="image URL #3"
          value={imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        />
        <div className="text-end">
          <button className="btn btn-primary" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminAddRoom;
