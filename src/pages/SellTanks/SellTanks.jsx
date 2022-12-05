import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ButtonCard from "../../components/ButtonCard/ButtonCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import DoughnutChartWithText from "../../components/DoughnutChartWithText/DoughnutChartWithText";
import OrderSummeryTable from "../../components/OrderSummeryTable/OrderSummeryTable";
import TitleAndContent from "../../components/TitleAndContent/TitleAndContent";
import "./index.css";
const SellTanks = () => {
  return (
    <Box my={1} mb={2}>
      <Typography fontSize="1.5rem" fontWeight="bold">
        Sell Gas Tank
      </Typography>

      <Grid container gap={2} mt={2}>
        <OrderSummeryTable />
        <Grid item xs={5}>
          <ContentCard sx={{ pl: 3 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Tank Details
            </Typography>
            <Box
              sx={{
                height: "15.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box my={2} mr={5}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search Gas tank name"
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Tank Name:"}
                  titleSx={{ color: "black" }}
                  content="5KG Refilled"
                  sx={{ mr: 2, gap: 4.5, pt: 2 }}
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Selling Price:"}
                  titleSx={{ color: "black" }}
                  content="Rs. 5000.00"
                  sx={{ mr: 2, gap: 3, pt: 2 }}
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Quantity"}
                  titleSx={{ color: "black" }}
                  content={<input type={"text"} />}
                  sx={{ mr: 2, gap: 7, pt: 2 }}
                />
              </Box>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"end"}
                alignItems="end"
                gap={2}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: 0 }}
                >
                  Print Bill
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 0 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
      <Grid container gap={2} mt={2}>
        <Grid item xs>
          <ContentCard sx={{ height: "12rem" }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Stock Info
            </Typography>
            <Box display={"flex"} gap={3}>
              <DoughnutChartWithText />
              <DoughnutChartWithText />
              <DoughnutChartWithText />
              <DoughnutChartWithText />
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs={5}>
          <ContentCard>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Recently Selected
            </Typography>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
            </Grid>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellTanks;
