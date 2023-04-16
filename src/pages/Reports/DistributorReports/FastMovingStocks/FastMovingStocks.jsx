import {
  ArrowBack,
  ArrowForward,
  FileUpload,
  Print,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCard from "../../../../components/ContentCard/ContentCard";
import ReportLayout from "../../../../components/ReportLayout/ReportLayout";
import ReportTable from "../../../../components/ReportTable/ReportTable";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { getAllTanks } from "../../../../app/api/gasTankServices";
import { getAllDealers } from "../../../../app/api/userServices";
import { useSelector } from "react-redux";
import { fastMovingStocksReport } from "../../../../app/api/reportsService";
import StockReportTable from "../../../../components/StockReportTable/StockReportTable";
import "./index.css";
import _ from "lodash";
import { convertToRupees } from "../../../../utils/convertToRupees";

const FastMovingStocks = () => {
  const userId = useSelector((state) => state.loginDMS.userId);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dealers, setDealers] = useState([]);
  const [gasTanks, setGasTanks] = useState([]);
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [selectedTanks, setSelectedTanks] = useState([]);
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const pagesPerPage = 10;
  const noOfPages = Math.ceil(data.length / pagesPerPage);
  const generate = () => {
    fastMovingStocksReport(
      {
        userId: userId,
      },
      (response) => {
        setData(response.data);
      },
      () => {},
      () => {}
    );
  };

  useEffect(() => {
    getAllDealers(
      {
        distributorId: userId,
      },
      (response) => {
        if (response.status === 0) {
          setDealers(response.data);
        }
      },
      () => {}
    );

    getAllTanks(
      (response) => {
        if (response.status === 0) {
          setGasTanks(response.data);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
    generate();
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Fast moving stocks
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<FileUpload />}
            sx={{
              mr: 1,
            }}
          >
            PDF
          </Button>

          <Button variant="outlined" startIcon={<Print />}>
            Print
          </Button>
        </Box>
      </Box>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {/* <Grid item lg={3.5}>
          <ContentCard
            title="Fast moving stocks"
            sx={{
              borderRadius: 0,
            }}
          >
            <Typography mt={1}>Dealer</Typography>
            <Autocomplete
              multiple
              options={dealers}
              getOptionLabel={(option) => option.name}
              // getOptionSelected={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select dealer"
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                  }}
                />
              )}
              onChange={(e, value) => setSelectedDealers(value)}
            />

            <Typography mt={1}>Gas tanks</Typography>
            <Autocomplete
              multiple
              options={gasTanks}
              getOptionLabel={(option) => option.name + " " + option.type}
              // getOptionSelected={(option, value) =>
              //   option.indexedName === value.indexedName
              // }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name + " " + option.type}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select gas tanks"
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                  }}
                />
              )}
              onChange={(e, value) => setSelectedTanks(value)}
            />

            <Box mt={2} display={"flex"} justifyContent="end" gap={1}>
              <Button variant="outlined">Clear</Button>
              <Button variant="contained" onClick={generate}>
                Go
              </Button>
            </Box>
          </ContentCard>
        </Grid> */}
        <Grid item lg>
          <ReportLayout
            from={from}
            to={to}
            title="Fast moving stocks"
            subHeading=""
          >
            {Object.keys(data).map((oneEl, index) => {
              let tankName = oneEl.split("tank");
              return (
                <div key={index}>
                  <Box
                    sx={{
                      py: 1,
                      pl: 2,
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography fontWeight={"bold"}>
                      {tankName[0].toUpperCase() +
                        " " +
                        _.capitalize(tankName[1])}
                    </Typography>
                  </Box>
                  <table className="stock-tb-table">
                    <thead>
                      <tr>
                        <th className="stock-tb-th">Dealer</th>
                        <th
                          className="stock-tb-th"
                          title="Distributor selling price"
                        >
                          Current Stock
                        </th>
                        <th className="stock-tb-th"> Sold(tanks)</th>
                        <th
                          className="stock-tb-th"
                          title="Dealer selling price"
                        >
                          Last Month Income
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data[oneEl].map((oneEl, index) => {
                        return (
                          <tr className="stock-tb-tr" key={index}>
                            <td className="stock-tb-td">{oneEl.dealer.name}</td>
                            <td className="stock-tb-td">
                              {oneEl.currentValue}
                            </td>
                            <td className="stock-tb-td ">
                              {oneEl.lastMonthSales}
                            </td>

                            <td className="stock-tb-td">
                              {convertToRupees(oneEl.lastMonthIncome)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Divider
                    sx={{
                      my: 2,
                    }}
                  />
                </div>
              );
            })}

            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                {...{ disabled: currentPage === 1 }}
              >
                <ArrowBack />
              </Button>
              <Typography>
                {noOfPages === 0
                  ? `0 of 0 pages`
                  : `${currentPage} of ${noOfPages} pages`}
              </Typography>
              <Button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                {...{ disabled: currentPage === noOfPages || noOfPages === 0 }}
              >
                <ArrowForward />
              </Button>
            </Box> */}
          </ReportLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default FastMovingStocks;
