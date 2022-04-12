import React, { useEffect, useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

function RoomItem({ room, checkInDate, checkOutDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      return;
    }
  });

  return (
    <div className="row bs" data-aos="fade-up">
      <div className="col-md-4">
        <img
          src={room.imageurls[0]}
          alt="first hotel room"
          className="smallimg"
        />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <br />
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {user && checkInDate && checkOutDate && (
            <Link to={`/book/${room._id}/${checkInDate}/${checkOutDate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel fade>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={url}>
                  <img
                    className="d-block w-100   "
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p className="mt-3">{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoomItem;
