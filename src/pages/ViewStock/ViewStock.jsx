import React from "react";
import { Pie } from "react-chartjs-2";
import PieChartLegend from "./PieChartLegend";
import StockLevelCard from "./StockLevelCard";
import QuickActionBtn from "../../components/QuickActionBtn/QuickActionBtn";
import EstimatedLevelCard from "./EstimatedLevelCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],

      borderWidth: 1,
    },
  ],
};

const ViewStock = () => {
  return (
    <Box>
      {/* content area */}
      <Grid container display={"flex"} mt={2}>
        <Grid item xs={5} p={1} pl={0}>
          <ContentCard>
            <Box>
              <Typography fontSize={"1.5rem"}>In-House Stock</Typography>
            </Box>
            <Grid container style={{ height: "15rem" }}>
              <Grid
                item
                lg={7}
                display="flex"
                alignItems={"center"}
                justifyContent="center"
              >
                <Box style={{ width: "200px" }}>
                  <Pie
                    data={data}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg
                display={"flex"}
                flexDirection="column"
                justifyContent={"center"}
                gap={2}
              >
                <PieChartLegend
                  label="New Tanks"
                  indicatorColor="rgba(255, 99, 132, 1)"
                />
                <PieChartLegend
                  label="Refilled Tanks"
                  indicatorColor="rgba(54, 162, 235, 1)"
                />
                <PieChartLegend
                  label="Returned Tanks"
                  indicatorColor="rgba(255, 206, 86, 1)"
                />
                <PieChartLegend
                  label="Empty Tanks"
                  indicatorColor="rgba(75, 192, 192, 1)"
                />
              </Grid>
            </Grid>
          </ContentCard>

          <Grid container mt={2} rowSpacing={1}>
            {/* <Grid item lg={5.8}>
              <StockLevelCard title={"2.5KG Tanks"} />
            </Grid> */}
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              <Grid item xs={6}>
                <StockLevelCard title={"2.5KG Tanks"} />
              </Grid>
              <Grid item xs={6}>
                <StockLevelCard title={"2.5KG Tanks"} />
              </Grid>
              <Grid item xs={6}>
                <StockLevelCard title={"2.5KG Tanks"} />
              </Grid>
              <Grid item xs={6}>
                <StockLevelCard title={"2.5KG Tanks"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs mt={1}>
          <ContentCard>
            <Box>
              <Box>
                <Typography fontSize={"1.5rem"}>Quick Actions</Typography>
              </Box>
              <Grid container gap={2} my={4}>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Update Stock"} />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Re-order levels"} />
                </Grid>
              </Grid>
              <Grid container gap={2} my={4}>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Send Stock"} />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Distribute Stock"} />
                </Grid>
              </Grid>
              <Grid container gap={2} my={4}>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Delete Stock"} />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn title={"Print Details"} />
                </Grid>
              </Grid>

              <Box>
                <Typography fontSize={"1.5rem"}>
                  Estimated Re-order level reach
                </Typography>
              </Box>
              <Box
                display={"flex"}
                gap={2}
                py={2}
                style={{ maxWidth: "35rem", overflowX: "scroll" }}
              >
                <EstimatedLevelCard
                  tankType="12.5KG Tanks"
                  newTankEndDate="25th July 2022"
                  refilledTankEndDate="25th July 2022"
                />
                <EstimatedLevelCard
                  tankType="12.5KG Tanks"
                  newTankEndDate="25th July 2022"
                  refilledTankEndDate="25th July 2022"
                />
                <EstimatedLevelCard
                  tankType="12.5KG Tanks"
                  newTankEndDate="25th July 2022"
                  refilledTankEndDate="25th July 2022"
                />
                <EstimatedLevelCard
                  tankType="12.5KG Tanks"
                  newTankEndDate="25th July 2022"
                  refilledTankEndDate="25th July 2022"
                />
              </Box>
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewStock;
