import React from "react";

function Success({ message }) {
  return (
    <div style={{ margin: "20px" }}>
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Success;
