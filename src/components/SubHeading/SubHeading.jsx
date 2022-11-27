import React from "react";

const SubHeading = ({ title }) => {
  return (
    <div className="d-flex col mt-2 px-2">
      <div className="fs-5 fw-bold">{title}</div>
      <div className="col pt-2 ps-2">
        <hr style={{ color: "black" }} />
      </div>
    </div>
  );
};

export default SubHeading;
