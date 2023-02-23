import {
  ArrowBack,
  ArrowForward,
  FileUpload,
  Print,
} from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { receivables } from "../../app/api/reportsService";
import { getAllDealers } from "../../app/api/userServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportLayout from "../../components/ReportLayout/ReportLayout";
import ReportTable from "../../components/ReportTable/ReportTable";
import { convertToRupees } from "../../utils/convertToRupees";

const TankReturns = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const [currentPage, setCurrentPage] = useState(1);
  const [dealers, setDealers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [totalReceivables, setTotalReceivables] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const pagesPerPage = 10;
  const noOfPages = Math.ceil(data.length / pagesPerPage);

  const generate = () => {
    console.log(min, max);
    receivables(
      {
        dealers: selectedDealers.map((dealer) => dealer._id),
        minAmount: Number(min),
        maxAmount: Number(max),
      },
      (response) => {
        if (response.status === 0) {
          setCurrentPage(1);
          const totalReceivables = response.data.reduce((acc, oneEl) => {
            return acc + oneEl.outstandingAmount;
          }, 0);
          setTotalReceivables(totalReceivables);
          setData(
            response.data.map((oneEl) => ({
              name: oneEl.name,
              storeAddress: oneEl.storeAddress,
              phoneNumber: oneEl.phoneNumber,
              email: oneEl.email,
              outstandingAmount: convertToRupees(oneEl.outstandingAmount),
            }))
          );
        }
      },
      (error) => {
        console.log(error);
      },
      () => {}
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
          Sales Report
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
            title="Accounts receivable"
            sx={{
              borderRadius: 0,
            }}
          >
            {/* <Typography>From</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
              onChange={(e) => setFrom(e.target.value)}
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
            /> */}
            <Typography mt={1}>Dealer</Typography>
            <Autocomplete
              multiple
              options={dealers}
              getOptionLabel={(option) => option.name}
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
            <Typography mt={1}>Amount between</Typography>
            <Box
              mt={1}
              display={"flex"}
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <TextField
                type="number"
                fullWidth
                size="small"
                placeholder="min"
                onChange={(e) => setMin(e.target.value)}
              />
              <Typography>-</Typography>
              <TextField
                type="number"
                fullWidth
                size="small"
                placeholder="max"
                onChange={(e) => setMax(e.target.value)}
              />
            </Box>

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
            from={""}
            to={""}
            subHeading={
              <>
                {/* FIXME: */}
                <span>
                  Total receivables: {convertToRupees(totalReceivables)}
                </span>
                <br></br>
                <span>AR turover ratio: {convertToRupees(50)}</span>
              </>
            }
          >
            <ReportTable
              headingCells={[
                "Name",
                "Store Address",
                "Phone Number",
                "Email",
                "Outstanding Amount",
              ]}
              tableContent={data.slice(
                (currentPage - 1) * pagesPerPage,
                currentPage * pagesPerPage
              )}
              columns={[
                "name",
                "storeAddress",
                "phoneNumber",
                "email",
                "outstandingAmount",
              ]}
            />

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

export default TankReturns;
