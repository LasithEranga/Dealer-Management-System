import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import PieChartLegend from "./PieChartLegend";
import StockLevelCard from "./StockLevelCard";
import QuickActionBtn from "../../components/QuickActionBtn/QuickActionBtn";
import EstimatedLevelCard from "./EstimatedLevelCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Titlebar from "../../components/Titlebar/Titlebar";
import { useEffect } from "react";
import {
  getChartData,
  getStockByUser,
  getStocksByUserAndType,
  getStockSummery,
  updateReOrderLevel,
  updateStock,
} from "../../app/api/gasStockServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getColorFromName } from "../../utils/getColorFromName";
import { Menu } from "@mui/icons-material";
import { setTankTypeColors } from "../../reducers/chartColorSlice";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../app/alertServices";
const ViewStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const { tankTypeColors } = useSelector((state) => state.chartColorsDMS);
  const [chartData, setChartData] = useState([]);
  const [stockSummery, setStockSummery] = useState({});
  const [showColorModal, setShowColorModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showReOrderLevelModal, setShowReOrderLevelModal] = useState(false);
  const [showSendStock, setShowSendStock] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [gasStocks, setGasStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState({});
  const [updatedStockValue, setUpdatedStockValue] = useState("");
  const [
    selectedStockForReOrderLevelUpdate,
    setSelectedStockForReOrderLevelUpdate,
  ] = useState({});
  const [updatedReOrderLevel, setUpdatedReOrderLevel] = useState("");
  const [returnableStocks, setReturnableStocks] = useState([]);
  const [selectedReturnableStock, setSelectedReturnableStock] = useState({});
  const [sendingQuantity, setSendingQuantity] = useState("");
  const [stockToDelete, setStockToDelete] = useState({});

  const [tankTypes, setTankTypes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    getStockByUser(
      { userID: userId },
      (response) => {
        setGasStocks(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
    getStocksByUserAndType(
      {
        userID: userId,
        types: ["EMPTY", "RETURNED"],
      },
      (response) => {
        setReturnableStocks(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, [showColorModal, refresh]);

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

      <CustomModal open={showUpdateModal} setOpen={setShowUpdateModal}>
        <Typography
          fontSize={"1.5rem"}
          sx={{
            mb: 2,
          }}
        >
          {" "}
          Update stock{" "}
        </Typography>
        <Typography fontSize={"1rem"}> Choose stock </Typography>
        <Autocomplete
          options={gasStocks}
          getOptionLabel={(option) =>
            option.gasTank.name + " " + option.gasTank.type
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select gas stock"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
          )}
          onChange={(e, value) => setSelectedStock(value)}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          Current Value
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          inputProps={{
            readOnly: true,
          }}
          value={selectedStock.quantity}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          New Value
        </Typography>
        <TextField
          placeholder="Enter new quantity"
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          value={updatedStockValue}
          onChange={(e) => {
            setUpdatedStockValue(e.target.value);
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              setShowUpdateModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              updateStock(
                {
                  stockId: selectedStock._id,
                  quantity: updatedStockValue,
                },
                (response) => {
                  console.log("response", response);
                  setShowUpdateModal(false);
                  showSystemAlert("Stock updated successfully", "success");
                  setRefresh(!refresh);
                  setSelectedStock({});
                  setUpdatedStockValue("");
                },
                (error) => {
                  console.log("error", error);
                }
              );
            }}
          >
            Update
          </Button>
        </Box>
      </CustomModal>

      <CustomModal
        open={showReOrderLevelModal}
        setOpen={setShowReOrderLevelModal}
      >
        <Typography fontSize={"1.5rem"}>Set Re-order Levels </Typography>
        <Typography fontSize={"1rem"}> Choose stock </Typography>
        <Autocomplete
          options={gasStocks}
          getOptionLabel={(option) =>
            option.gasTank.name + " " + option.gasTank.type
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select gas stock"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
          )}
          onChange={(e, value) => setSelectedStockForReOrderLevelUpdate(value)}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          Current Value
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          inputProps={{
            readOnly: true,
          }}
          value={selectedStockForReOrderLevelUpdate.reOrderLevel}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          New Value
        </Typography>
        <TextField
          placeholder="Enter new quantity"
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          value={updatedReOrderLevel}
          onChange={(e) => {
            setUpdatedReOrderLevel(e.target.value);
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              setShowReOrderLevelModal(false);
              setSelectedStockForReOrderLevelUpdate({});
              setUpdatedReOrderLevel("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              updateReOrderLevel(
                {
                  stockId: selectedStockForReOrderLevelUpdate._id,
                  newValue: updatedReOrderLevel,
                },
                (response) => {
                  setShowReOrderLevelModal(false);
                  showSystemAlert(
                    "Re-order level updated successfully",
                    "success"
                  );
                  setRefresh(!refresh);
                  setSelectedStockForReOrderLevelUpdate({});
                  setUpdatedReOrderLevel("");
                },
                (error) => {
                  console.log("error", error);
                }
              );
            }}
          >
            Set
          </Button>
        </Box>
      </CustomModal>

      <CustomModal open={showSendStock} setOpen={setShowSendStock}>
        <Typography fontSize={"1.5rem"}>
          Send Stocks to filling station
        </Typography>

        <Autocomplete
          options={returnableStocks}
          getOptionLabel={(option) =>
            option.gasTank.name + " " + option.gasTank.type
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select gas stock"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
          )}
          onChange={(e, value) => setSelectedReturnableStock(value)}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          Current Value
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          inputProps={{
            readOnly: true,
          }}
          value={selectedReturnableStock.quantity}
        />
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 1,
          }}
        >
          Sending
        </Typography>
        <TextField
          placeholder="Enter quantity to send"
          fullWidth
          size="small"
          sx={{
            mt: 1,
          }}
          value={sendingQuantity}
          onChange={(e) => {
            setSendingQuantity(e.target.value);
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              setShowSendStock(false);
              setSelectedReturnableStock({});
              setSendingQuantity("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              updateStock(
                {
                  stockId: selectedReturnableStock._id,
                  quantity: selectedReturnableStock.quantity - sendingQuantity,
                },
                (response) => {
                  setShowSendStock(false);
                  showSystemAlert("Stock details updated", "success");
                  setRefresh(!refresh);
                  setSelectedReturnableStock({});
                  setSendingQuantity("");
                },
                (error) => {
                  console.log("error", error);
                }
              );
            }}
          >
            Send
          </Button>
        </Box>
      </CustomModal>

      <CustomModal
        open={showDeleteConfirmation}
        setOpen={setShowDeleteConfirmation}
      >
        <Typography fontSize={"1.5rem"}>Delete Stock</Typography>
        <Typography
          fontSize={"1rem"}
          sx={{
            mt: 2,
          }}
        >
          Choose stock
        </Typography>
        <Autocomplete
          options={gasStocks}
          getOptionLabel={(option) =>
            option.gasTank.name + " " + option.gasTank.type
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select gas stock"
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            />
          )}
          onChange={(e, value) => setStockToDelete(value)}
        />
        {stockToDelete._id && (
          <Typography
            fontSize={"0.8rem"}
            color={"red"}
            sx={{
              mt: 1,
            }}
          >
            This will remove the current stock details. Are you sure?
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              setShowDeleteConfirmation(false);
              setRefresh(!refresh);
              setStockToDelete({});
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            color="error"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              updateStock(
                {
                  stockId: stockToDelete._id,
                  quantity: 0,
                },
                (response) => {
                  setShowDeleteConfirmation(false);
                  showSystemAlert("Stock details removed", "success");
                  setRefresh(!refresh);
                  setStockToDelete({});
                },
                (error) => {
                  console.log("error", error);
                }
              );
            }}
          >
            Delete
          </Button>
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
                  <QuickActionBtn
                    title={"Update Stock"}
                    onClick={() => {
                      setShowUpdateModal(true);
                    }}
                  />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn
                    title={"Re-order levels"}
                    onClick={() => {
                      setShowReOrderLevelModal(true);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container gap={2} my={4}>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn
                    title={"Send Stock"}
                    onClick={() => {
                      setShowSendStock(true);
                    }}
                  />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn
                    title={"Distribute Stock"}
                    onClick={() => {
                      navigate("/distribute-stock");
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container gap={2} my={4}>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn
                    title={"Delete Stock"}
                    onClick={() => {
                      setShowDeleteConfirmation(true);
                    }}
                  />
                </Grid>
                <Grid item xs display="flex" justifyContent={"center"}>
                  <QuickActionBtn
                    title={"Print Details"}
                    onClick={() => {
                      navigate("/distributor-reports/stocks-report");
                    }}
                  />
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
                  tankType="2.3KG Tanks"
                  newTankEndDate="25th April 2023"
                  refilledTankEndDate="30th April 2023"
                />
                <EstimatedLevelCard
                  tankType="5KG Tanks"
                  newTankEndDate="14th May 2023"
                  refilledTankEndDate="20th April 2023"
                />
                <EstimatedLevelCard
                  tankType="12.5KG Tanks"
                  newTankEndDate="10th April 2023"
                  refilledTankEndDate="26th April 2023"
                />
                <EstimatedLevelCard
                  tankType="37.5KG Tanks"
                  newTankEndDate="10th April 2023"
                  refilledTankEndDate="26th April 2023"
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
