import React from "react";
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";

function Loader({ loading }) {

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div style={{ marginTop: "250px" }}>
      <div className="sweet-loading">
        <GridLoader color={"#000"} loading={loading} css={override} size={20} />
      </div>
    </div>
  );
}

export default Loader;
