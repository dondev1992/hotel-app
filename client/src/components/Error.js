import React from "react";

function Error({ message }) {
  return (
    <div style={{ margin: "20px" }}>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error;
