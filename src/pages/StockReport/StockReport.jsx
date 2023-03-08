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
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportLayout from "../../components/ReportLayout/ReportLayout";
import ReportTable from "../../components/ReportTable/ReportTable";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "./index.css";
import StockReportTable from "../../components/StockReportTable/StockReportTable";
import { stockReport } from "../../app/api/reportsService";
import { useSelector } from "react-redux";
import {
  getAllTanks,
  getTankNames,
  getTankTypes,
} from "../../app/api/gasTankServices";

const StockReport = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const pagesPerPage = 10;
  const [gasTanks, setGasTanks] = useState([]);
  const [tankTypes, setTankTypes] = useState([]);
  const noOfPages = Math.ceil(data.length / pagesPerPage);
  const [selectedTankNames, setSelectedTankNames] = useState([]);
  const [selectedTankTypes, setSelectedTankTypes] = useState([]);

  const generate = () => {
    stockReport(
      {
        userId,
        tankNames: selectedTankNames,
        tankTypes: selectedTankTypes,
        distributionFrom: from,
        distributionTo: to,
      },
      (response) => {
        if (response.status === 0) {
          setData(response.data);
        }
      },
      () => {},
      () => {}
    );
  };

  useEffect(() => {
    generate();

    getTankNames(
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

    getTankTypes(
      (response) => {
        if (response.status === 0) {
          setTankTypes(response.data);
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
          In-House Stock Report
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
            title="Sales Report"
            sx={{
              borderRadius: 0,
            }}
          >
            <Typography>Distribution - From</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
              onChange={(e) => setFrom(e.target.value)}
            />
            <Typography mt={1}>Distribution - To</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
              onChange={(e) => setTo(e.target.value)}
            />
            <Typography mt={1}>Tank Name</Typography>
            <Autocomplete
              multiple
              options={gasTanks}
              getOptionLabel={(option) => option}
              // getOptionSelected={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select tank"
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                  }}
                />
              )}
              onChange={(e, value) => {
                setSelectedTankNames(value);
              }}
            />

            <Typography mt={1}>Tank Type</Typography>

            <Autocomplete
              multiple
              options={tankTypes}
              getOptionLabel={(option) => option}
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
                  {option}
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
                setSelectedTankTypes(value);
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
            title="In-House Stock Report"
          >
            {Object.keys(data).map((oneEl, index) => {
              return (
                <div key={index}>
                  <StockReportTable title={oneEl} data={data[oneEl]} />
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

export default StockReport;
