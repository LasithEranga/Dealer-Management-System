import {
  ArrowBack,
  ArrowForward,
  DocumentScanner,
  FileUpload,
  Print,
  Visibility,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
import { purchaseOrdersReports } from "../../../../app/api/reportsService";
import { useSelector } from "react-redux";
import { convertToRupees } from "../../../../utils/convertToRupees";
import { getAllDealers } from "../../../../app/api/userServices";
import { getAllTanks } from "../../../../app/api/gasTankServices";

const PurchaseOrdersReport = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [gasTanks, setGasTanks] = useState([]);
  const [selectedTanks, setSelectedTanks] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [orderState, setOrderState] = useState([
    { label: "Pending", value: "PENDING" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Pending Payment", value: "PENDING_PAYMENT" },
    { label: "Paid", value: "PAID" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const pagesPerPage = 10;
  const noOfPages = Math.ceil(data.length / pagesPerPage);
  const generate = () => {
    purchaseOrdersReports(
      {
        userId: userId,
        from: from,
        to: to,
        dealers: selectedDealers.map((dealer) => dealer._id),
        tankTypes: selectedTanks.map((tank) => tank._id),
        orderStates: selectedStates.map((state) => state.value),
      },
      (response) => {
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    //get dealers from api
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
    //get gas tanks from api
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
          Purchase Orders Report
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
        <Grid item lg={3.5}>
          <ContentCard
            title="Purchase Orders"
            sx={{
              borderRadius: 0,
            }}
          >
            <Typography>From</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
              onChange={(e) => setFrom(e.target.value)}
              value={from}
            />
            <Typography mt={1}>To</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
              onChange={(e) => setTo(e.target.value)}
              value={to}
            />
            <Typography mt={1}>Dealers</Typography>
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
              onChange={(e, value) => {
                setSelectedDealers(value);
              }}
            />

            <Typography mt={1}>Tank Type</Typography>

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
              onChange={(e, value) => {
                setSelectedTanks(value);
              }}
            />

            <Typography mt={1}>Order State</Typography>

            <Autocomplete
              multiple
              options={orderState}
              // getOptionLabel={(option) => option.label}
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
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select order state"
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                  }}
                />
              )}
              onChange={(e, value) => {
                console.log(value);
                setSelectedStates(value);
              }}
            />

            <Box mt={2} display={"flex"} justifyContent="end" gap={1}>
              <Button variant="outlined">Clear</Button>
              <Button variant="contained" onClick={generate}>
                Go
              </Button>
            </Box>
          </ContentCard>
        </Grid>
        <Grid item lg>
          <ReportLayout
            from={from}
            to={to}
            subHeading={``}
            title="Purchase Orders"
          >
            <table className="report-table">
              <thead style={{ position: "sticky", top: 0 }}>
                <tr className="report-tr">
                  {["#", "Date", "Dealer", "Total", "State", "Actions"].map(
                    (oneEl, index) => (
                      <th className="report-th" key={index}>
                        {oneEl}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="report-body">
                {data
                  .slice(
                    (currentPage - 1) * pagesPerPage,
                    currentPage * pagesPerPage
                  )
                  .map((oneEl, index) => {
                    return (
                      <tr className="report-tr" key={index}>
                        <td className="report-td">{index + 1}</td>
                        <td className="report-td">
                          {oneEl.createdAt
                            ? new Date(oneEl.createdAt).toLocaleDateString()
                            : ""}
                        </td>
                        <td className="report-td">
                          {oneEl.dealer.name ? oneEl.dealer.name : ""}
                        </td>
                        <td className="report-td">
                          {oneEl.total ? convertToRupees(oneEl.total) : ""}
                        </td>
                        <td className="report-td">
                          {oneEl.state ? oneEl.state : ""}
                        </td>
                        <td className="report-td">
                          <Button variant="text" title="View">
                            <DocumentScanner />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}

                {/* if tableContent consists less than 10 rows, fill rest with empty data */}
                {data.slice(
                  (currentPage - 1) * pagesPerPage,
                  currentPage * pagesPerPage
                ).length < 10 &&
                  data.slice(
                    (currentPage - 1) * pagesPerPage,
                    currentPage * pagesPerPage
                  ).length !== 0 &&
                  [
                    ...Array(
                      10 -
                        data.slice(
                          (currentPage - 1) * pagesPerPage,
                          currentPage * pagesPerPage
                        ).length
                    ),
                  ].map((oneEl, index) => {
                    return (
                      <tr className="report-tr" key={index}>
                        <td colSpan={6}></td>
                      </tr>
                    );
                  })}

                {/* show no records if table content is empty array */}
                {data.slice(
                  (currentPage - 1) * pagesPerPage,
                  currentPage * pagesPerPage
                ).length === 0 && (
                  <tr className="report-tr">
                    <td colSpan={6}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        height={"100%"}
                        my={4}
                      >
                        <Typography fontSize={"1.2rem"}>
                          No records to show!
                        </Typography>
                      </Box>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Box
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
            </Box>
          </ReportLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default PurchaseOrdersReport;
