import { Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { DEALERS } from "../../data";
import "./index.css";

const EnhancedTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  console.log(DEALERS);
  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Delaer</th>
            <th>Name </th>
            <th>Address</th>
            <th>Phone no</th>
            <th>Email</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {DEALERS.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          ).map((element, index) => {
            return (
              <tr key={index}>
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

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "10px",
          marginRight: "20px",
        }}
      >
        <div>
          <Typography>Rows per page</Typography>
        </div>
        <div>
          <select
            value={`${rowsPerPage}`}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
            }}
            style={{
              padding: "0px 5px 0px 10px",
              backgroundColor: "Window",
              border: "none",
              marginRight: "20px",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div
          style={{
            marginRight: "20px",
          }}
        >{`${page * rowsPerPage + 1} -${
          page * rowsPerPage + rowsPerPage < DEALERS.length
            ? page * rowsPerPage + rowsPerPage
            : page * rowsPerPage + DEALERS.length - page * rowsPerPage
        }  of ${DEALERS.length}`}</div>
        <Button
          {...(page === 0 && { disabled: true })}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          prev
        </Button>
        <Button
          {...(page + 1 >= DEALERS.length / rowsPerPage && {
            disabled: true,
          })}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default EnhancedTable;
