import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 2000,
});

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-10 text-center">
        <h2
          style={{
            fontSize: "100px",
          }}
          data-aos="zoom-in"
        >
          Luxury Collection Hotel
        </h2>
        <h1 style={{ color: "black" }} data-aos="zoom-out">
          There is only one Boss. The guest.
        </h1>

        <Link to="/home">
          <button className="landing_btn btn mt-3">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
