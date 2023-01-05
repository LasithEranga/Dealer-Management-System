import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import PieChartLegend from "./PieChartLegend";
import StockLevelCard from "./StockLevelCard";
import QuickActionBtn from "../../components/QuickActionBtn/QuickActionBtn";
import EstimatedLevelCard from "./EstimatedLevelCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import Titlebar from "../../components/Titlebar/Titlebar";
import { useEffect } from "react";
import { getChartData, getStockSummery } from "../../app/api/gasStockServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getColorFromName } from "../../utils/getColorFromName";
import { Menu } from "@mui/icons-material";
import { setTankTypeColors } from "../../reducers/chartColorSlice";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./style.css";
const ViewStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const { tankTypeColors } = useSelector((state) => state.chartColorsDMS);
  const [chartData, setChartData] = useState([]);
  const [stockSummery, setStockSummery] = useState({});
  const [showColorModal, setShowColorModal] = useState(false);
  const [tankTypes, setTankTypes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showColorModal) {
      getChartData({ userId }, (response) => {
        let tempData = response.data;
        console.log("tempData", tempData);
        setTankTypes(tempData.map((oneEl) => oneEl._id));
        tempData.map(
          (oneEl) =>
            (oneEl["color"] = tankTypeColors[oneEl._id]
              ? tankTypeColors[oneEl._id]
              : "#000")
        );
        console.log("tempData", tempData);
        setChartData(tempData);
      });
      getStockSummery({ userId }, (response) => {
        setStockSummery(response.data);
      });
    }
  }, [showColorModal]);

  const data = {
    labels: chartData.map((oneEl) => `${_.capitalize(oneEl._id)} tanks`),
    datasets: [
      {
        data: chartData.map((oneEl) => oneEl.quantity),
        backgroundColor: chartData.map((oneEl) => oneEl.color),

        borderWidth: 0.3,
      },
    ],
  };

  return (
    <Box>
      <CustomModal open={showColorModal} setOpen={setShowColorModal}>
        <Typography fontSize={"1.5rem"}> Set Chart Colors </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 4,
            mb: 5,
          }}
        >
          {tankTypes.map((oneEl) => (
            <Box display={"flex"} alignItems="center" gap={1} width={"100px"}>
              <input
                className="color-picker"
                type={"color"}
                value={tankTypeColors[oneEl]}
                onChange={(event) => {
                  let colors = { ...tankTypeColors };
                  colors[oneEl] = event.target.value;
                  dispatch(setTankTypeColors({ tankTypeColors: colors }));
                }}
              />
              <Typography>{oneEl}</Typography>
            </Box>
          ))}
        </Box>
      </CustomModal>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          View Stock Details
        </Typography>
      </Box>
      {/* content area */}
      <Grid container display={"flex"} mt={2}>
        <Grid item xs={5} p={1} pl={0}>
          <ContentCard>
            <Box display={"flex"} justifyContent="space-between">
              <Titlebar title={"In-House Stock"} />
              <div
                onClick={() => {
                  setShowColorModal(true);
                }}
              >
                <Menu />
              </div>
            </Box>
            <Grid container style={{ height: "15rem" }}>
              <Grid
                item
                lg={6}
                display="flex"
                alignItems={"center"}
                justifyContent="start"
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
                pl={1}
              >
                {chartData.map((oneEl, index) => (
                  <PieChartLegend
                    key={index}
                    label={`${_.capitalize(oneEl._id)} tanks`}
                    indicatorColor={oneEl.color}
                    count={oneEl.quantity}
                  />
                ))}
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
              {Object.keys(stockSummery).map((oneEl) => (
                <Grid item xs={6}>
                  <StockLevelCard title={oneEl} data={stockSummery[oneEl]} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs mt={1} ml={1}>
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
                style={{
                  maxWidth: "35rem",
                  overflowX: "scroll",
                  scrollbarWidth: "thin",
                }}
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
