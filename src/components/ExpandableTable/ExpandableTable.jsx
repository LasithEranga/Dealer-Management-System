import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { convertToRupees } from "../../utils/convertToRupees";
import CustomButton from "../CustomButton/CustomButton";
import NameAvatar from "../NameAvatar/NameAvatar";
import PlainTable from "../PlainTable/PlainTable";
import "./index.css";

const ExpandableTable = ({
  headCells = [],
  actionButtons = [],
  enableAvatar = {
    isVisible: true,
    madeBy: [0],
  },
  data = [],
  ignoreTill = 0,
  dealerView = false,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(-1);

  const dispayingRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headCell = dealerView
    ? [
        "Gas Tank",
        "Type",
        "Qty",
        <Tooltip title="Current Quantity @ Dealer Stock">
          <span>CQ @ Dealer</span>
        </Tooltip>,
        <Box display={"flex"} justifyContent={"center"}>
          Price
        </Box>,
        <Box display={"flex"} justifyContent={"center"}>
          Total
        </Box>,
      ]
    : [
        "Gas Tank",
        "Type",
        "Qty",
        <Tooltip title="Current Quantity @ Dealer Stock">
          <span>CQ @ Dealer</span>
        </Tooltip>,
        <Tooltip title="Current Quantity @ In-House Stock">
          <span>CQ @ In-House</span>
        </Tooltip>,

        <Box display={"flex"} justifyContent={"center"}>
          Price
        </Box>,
        <Box display={"flex"} justifyContent={"center"}>
          Total
        </Box>,
      ];

  return (
    <div>
      <table style={{ width: "100%" }} className="ep-table">
        <thead>
          <tr className="ep-tr">
            {headCells.map((oneEl, index) => (
              <th className="ep-th" key={index}>
                {oneEl}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dispayingRows.map((element, index) => {
            return (
              <>
                <tr key={index} className="ep-tr">
                  {Object.values(element)
                    .slice(ignoreTill)
                    .map((oneEl, index) => {
                      return (
                        <td className="ep-td " key={index}>
                          {enableAvatar.isVisible &&
                          enableAvatar.madeBy.includes(index) ? (
                            <NameAvatar name={oneEl} />
                          ) : (
                            oneEl
                          )}
                        </td>
                      );
                    })}

                  <td className="ep-td">
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      flexWrap="nowrap"
                    >
                      {actionButtons.map((oneEl, index) => {
                        return (
                          <CustomButton
                            onClick={() => {
                              oneEl.onClick(Object.values(element)[0]);
                            }}
                            sx={{ ml: 1 }}
                          >
                            <Tooltip title={oneEl.tooltip}>
                              <span>{oneEl.icon}</span>
                            </Tooltip>
                          </CustomButton>
                        );
                      })}

                      <CustomButton
                        onClick={() => {
                          setExpanded(expanded === index ? -1 : index);
                        }}
                        sx={{ p: 0.1, ml: 1 }}
                      >
                        {expanded === index ? (
                          <ArrowDropUpIcon
                            sx={{
                              fontSize: "1.7rem",
                            }}
                          />
                        ) : (
                          <ArrowDropDownIcon
                            sx={{
                              fontSize: "1.7rem",
                            }}
                          />
                        )}
                      </CustomButton>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td colSpan={headCells.length}>
                    <div
                      className={`
                      ep-td-more 
                      ${expanded === index ? "ep-td-expanded" : ""}
                    `}
                    >
                      <Divider sx={{ mt: 1 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <PlainTable
                            height={"7rem"}
                            dataList={Object.values(element)[0]?.gasTanks?.map(
                              (oneEl) => {
                                return {
                                  gasTank: oneEl.gasTank.name,
                                  gasType: oneEl.gasTank.type,
                                  quantity: oneEl.quantity,
                                  cqDealer: oneEl.dealerStockQty,
                                  ...(!dealerView && {
                                    cqInhouse: oneEl.distributorStockQty,
                                  }),
                                  price: (
                                    <Box
                                      display={"flex"}
                                      justifyContent={"end"}
                                      ml={2}
                                    >
                                      {convertToRupees(
                                        oneEl.orderedPriceDealer
                                      )}
                                    </Box>
                                  ),

                                  total: (
                                    <Box
                                      display={"flex"}
                                      justifyContent={"end"}
                                      ml={2}
                                    >
                                      {convertToRupees(oneEl.subTotal)}
                                    </Box>
                                  ),
                                };
                              }
                            )}
                            headCells={headCell}
                          />
                        </Grid>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ ml: 2, mt: 4, mb: 2 }}
                        />

                        <Grid item xs>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
                                <Box>
                                  <Typography
                                    fontWeight={"bold"}
                                    fontSize="0.8rem"
                                  >
                                    Order Total
                                  </Typography>
                                  <Typography
                                    textAlign={"right"}
                                    fontSize="1.2rem"
                                    sx={{ mt: 4 }}
                                  >
                                    {convertToRupees(
                                      Object.values(element)[0]?.total
                                    )}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
                                <Box>
                                  <Tooltip title="Outstanding balance after accepting">
                                    <Typography
                                      fontWeight={"bold"}
                                      fontSize="0.8rem"
                                    >
                                      OB After Accepting
                                    </Typography>
                                  </Tooltip>
                                  <Typography
                                    textAlign={"right"}
                                    fontSize="1.2rem"
                                    sx={{ mt: 4 }}
                                  >
                                    {convertToRupees(
                                      Object.values(element)[0]?.dealer
                                        ?.outstandingAmount +
                                        Object.values(element)[0]?.total
                                    )}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                          </Grid>
                          <Box mt={2}>
                            <Typography fontSize="0.75rem" textAlign={"end"}>
                              Order Placed By{" "}
                              {Object.values(element)[0]?.placedBy}{" "}
                              {new Date(
                                Object.values(element)[0]?.createdAt
                              ).toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Divider />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}

          {dispayingRows.length < rowsPerPage &&
            dispayingRows.length !== 0 &&
            [...Array(rowsPerPage - dispayingRows.length)].map(
              (oneEl, index) => {
                return (
                  <tr className="ep-tr-blank" key={index}>
                    <td colSpan={headCells.length}></td>
                  </tr>
                );
              }
            )}

          {data.length === 0 && (
            <tr>
              <td colSpan={headCells.length}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                  my={2}
                >
                  <Typography fontSize={"1.5rem"}>No Orders Found!</Typography>
                </Box>
              </td>
            </tr>
          )}
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
              setPage(0);
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
          page * rowsPerPage + rowsPerPage < data.length
            ? page * rowsPerPage + rowsPerPage
            : page * rowsPerPage + data.length - page * rowsPerPage
        }  of ${data.length}`}</div>
        <Button
          {...(page === 0 && { disabled: true })}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          prev
        </Button>
        <Button
          {...(page + 1 >= data.length / rowsPerPage && {
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

export default ExpandableTable;
