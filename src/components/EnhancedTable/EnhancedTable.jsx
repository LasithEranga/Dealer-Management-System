import { Button } from "@mui/material";
import React from "react";
import { DEALERS } from "../../data";
import "./index.css";

const EnhancedTable = () => {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <th>Delaer</th>
          <th>Name </th>
          <th>Address</th>
          <th>Phone no</th>
          <th>Email</th>
          <th>Actions </th>
        </thead>
        <tbody>
          {DEALERS.map((element) => {
            return (
              <tr>
                <td>
                  <div className="d-flex justify-content-start align-items-center text-nowrap">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        backgroundColor: "#4AEBCB",
                      }}
                    >
                      DB
                    </div>
                    <div className="ps-2">
                      <div className="fw-bold">{element.name}</div>
                      <div>Rs.{element.outstandingAmount}.00</div>
                    </div>
                  </div>
                </td>
                {Object.values(element)
                  .slice(0, 4)
                  .map((oneEl, index) => {
                    return <td key={index}>{oneEl}</td>;
                  })}
                <td>
                  <Button>Edit</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedTable;
