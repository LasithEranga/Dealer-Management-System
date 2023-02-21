import {
  ArrowBack,
  ArrowForward,
  FileUpload,
  Print,
} from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportLayout from "../../components/ReportLayout/ReportLayout";
import ReportTable from "../../components/ReportTable/ReportTable";

const SalesReport = () => {
  const data = [
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 2",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 3",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 4",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 5",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 6",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 7",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 8",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 9",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 10",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 11",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 12",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 13",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 14",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 15",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 16",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 17",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 18",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 19",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 20",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
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
            title="Sales Report"
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
            />
            <Typography mt={1}>To</Typography>
            <TextField
              type="date"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
            <Typography mt={1}>Dealer</Typography>
            <TextField
              placeholder="Search Dealer"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
            <Typography mt={1}>Tank Type</Typography>
            <TextField
              placeholder="Search gas tank"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
            <Box mt={2} display={"flex"} justifyContent="end" gap={1}>
              <Button variant="outlined">Clear</Button>
              <Button variant="contained">Go</Button>
            </Box>
          </ContentCard>
        </Grid>
        <Grid item lg>
          <ReportLayout>
            <ReportTable
              headingCells={[
                "Date",
                "Dealer",
                "Gas tank",
                "Unit Price",
                "Qty",
                "Total",
              ]}
              tableContent={data.slice(
                (currentPage - 1) * 10,
                currentPage * 10
              )}
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
                {currentPage} of {data.length / 10} pages
              </Typography>
              <Button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                {...{ disabled: currentPage === data.length / 10 }}
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

export default SalesReport;
