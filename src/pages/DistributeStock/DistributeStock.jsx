import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import DealerDetails from "./DealerDetails";
import StockDetails from "./StockDetails";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import { searchDealer } from "../../app/api/userServices";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { getInitials } from "../../utils/generateInitials";
import { covertToRupees } from "../../utils/convertToRupees";
import { getStockByUser } from "../../app/api/gasStockServices";

const DistributeStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  // -------------------------use states -----------------------
  const [suggestedList, setSuggestedList] = useState([]);
  const [selected, setSelected] = useState({});

  const [suggestedGasStockList, setSuggestedGasStockList] = useState([]);
  const [selectedGasStock, setSelectedGasStock] = useState({});
  const [stopSearchGasStock, setStopSearchGasStock] = useState(false);

  // -------------------------use states -----------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
    watch,
    clearErrors,
    setFocus,
  } = useForm();

  const setValues = (dealer) => {
    setValue("name", dealer.name);
  };

  // useEffect(() => {
  //   if (keyword !== selected.name) {
  //     searchDealer({ keyword, distributor: userId }, (response) => {
  //       setSuggestedList(response.data);
  //     });
  //   }
  // }, [keyword]);

  useEffect(() => {
    console.log(selected);
    selected.name = _.startCase(selected.name);
    setValues(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    console.log(selectedGasStock);
    setValue("gasStock", selectedGasStock.name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGasStock]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log(name);
      if (name === "name") {
        //if value is empty
        if (value.name === "") {
          setSuggestedList([]);
          setValues({});
        } else {
          searchDealer(
            { keyword: value.name, distributor: userId },
            (response) => {
              setSuggestedList(response.data);
            }
          );
        }
      }
      if (name === "gasStock") {
        //if value is empty
        if (value.gasStock === "") {
          setSuggestedGasStockList([]);
          setSelectedGasStock({});
          setStopSearchGasStock(false);
        } else {
          //if there are no selected gas tanks search
          console.log(value.gasStock, selectedGasStock);
          getStockByUser(
            {
              userID: userId,
            },
            (data) => {
              setSuggestedGasStockList(
                data.data.map((oneEl) => ({
                  _id: oneEl._id,
                  quantity: oneEl.quantity,
                  ...oneEl.gasTank,
                }))
              );
            }
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Distribute Stock
        </Typography>
      </Box>

      <Grid container mt={2} columnSpacing={2}>
        <Grid item xs={5}>
          <ContentCard>
            <Typography fontWeight={"bold"} fontSize="1.5rem">
              Search Dealer
            </Typography>
            <Box sx={{ mr: 2, my: 1 }}>
              <StyledAutoComplete
                title={""}
                placeholder="Search Dealer"
                suggestedList={suggestedList}
                setSuggestedList={setSuggestedList}
                setSelected={setSelected}
                suggessionName={"Suggested Dealers"}
                madeOf={["name"]}
                register={register("name", {
                  required: {
                    value: true,
                    message: "Please select the dealer",
                  },
                })}
                errors={errors}
              />
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent="center"
              my={2}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
                sx={{
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "50%",
                }}
              >
                <Typography fontSize={"3rem"} fontWeight={"bold"}>
                  {selected.name ? getInitials(selected.name) : "search"}
                </Typography>
              </Box>
            </Box>

            <DealerDetails title={"Name:"} content={selected.name ?? ""} />
            <DealerDetails
              title={"Store:"}
              content={selected.storeAddress ?? ""}
            />
            <DealerDetails
              title={"Outstanding:"}
              content={covertToRupees(selected.outstandingAmount ?? 0)}
            />
            <DealerDetails
              title={"Address:"}
              content={selected.address ?? ""}
            />

            <Box display={"flex"} justifyContent="end" mt={2}>
              <Button variant="contained">Okay</Button>
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs display={"flex"} flexDirection="column">
          <Box
            p={2}
            flexGrow={1}
            display={"flex"}
            flexDirection="column"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          >
            <Typography fontWeight={"bold"} fontSize="1.5rem">
              Stock details
            </Typography>
            <Box sx={{ mr: 2, my: 1 }}>
              <Typography>Tank & Type</Typography>

              <StyledAutoComplete
                title={""}
                mt={0}
                placeholder="Search gas tank"
                suggestedList={suggestedGasStockList}
                setSuggestedList={setSuggestedGasStockList}
                setSelected={setSelectedGasStock}
                suggessionName={"Search gas stock"}
                madeOf={["name"]}
                register={register("gasStock", {
                  required: {
                    value: true,
                    message: "Please select a gas stock",
                  },
                })}
                errors={errors}
              />
            </Box>
            <StockDetails
              title={"Available Qty @ In-House"}
              placeholder={"568"}
            />
            <StockDetails title={"Quantity"} placeholder={"50"} />
            <Box
              display="flex"
              flexGrow={1}
              alignItems={"end"}
              gap={2}
              justifyContent="end"
              mr={2}
            >
              <Button variant="outlined">Clear</Button>
              <Button variant="contained">Allocate</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DistributeStock;
