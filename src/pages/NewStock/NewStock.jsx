import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { getReOrderLevel, newStock } from "../../app/api/gasStockServices";
import { searchGasTank } from "../../app/api/gasTankServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import useAutoComplete from "../../hooks/useAutoComplete";

const NewStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [
    keyword,
    setKeyword,
    suggestedTankList,
    setSuggestedTankList,
    selectedTank,
    setSelectedTank,
    setSearchedTank,
  ] = useAutoComplete(searchGasTank, {});

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

  const clearAll = () => {
    resetField("name");
    setKeyword("");
    resetField("type");
    resetField("quantity");
    resetField("reOrderLevel");
    resetField("orderedPriceDistributor");
    resetField("sellingPriceDistributor");
    resetField("orderedPriceDealer");
    resetField("sellingPriceDealer");
  };

  const setValues = (gasTank) => {
    setKeyword(gasTank.name);
    setValue("type", gasTank.type);
    setValue("orderedPriceDistributor", gasTank.orderedPriceDistributor);
    setValue("sellingPriceDistributor", gasTank.sellingPriceDistributor);
    setValue("orderedPriceDealer", gasTank.orderedPriceDealer);
    setValue("sellingPriceDealer", gasTank.sellingPriceDealer);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (selectedTank._id) {
      newStock(
        {
          user: userId,
          gasTank: selectedTank._id,
          quantity: Number(data.quantity),
          reOrderLevel: data.reOrderLevel,
        },
        (response) => {
          if (response.status === 0) {
            clearAll();
            showSystemAlert(response.message, "success");
          }
        }
      );
    } else {
      setError("name");
    }

    console.log(data);
  };

  useEffect(() => {
    if (selectedTank.name) {
      setValues(selectedTank);
      clearErrors(["name", "type"]);
      if (selectedTank._id) {
        setFocus("quantity");
      }
      // get re-order level if gas tank already has a stock
      getReOrderLevel({ userId, gasTankId: selectedTank._id }, (response) => {
        if (response.data !== "NOT_FOUND") {
          setValue("reOrderLevel", response.data.reOrderLevel);
          clearErrors("reOrderLevel");
        } else {
          setValue("reOrderLevel", "");
        }
      });
      setKeyword(selectedTank.name + " " + selectedTank.type);
      setSearchedTank(selectedTank.name + " " + selectedTank.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTank]);

  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          New Stock
        </Typography>
      </Box>

      <ContentCard sx={{ px: 3, mr: 1 }}>
        <Grid container columnSpacing={4} rowSpacing={4} pt={0.5}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Tank Details
            </Typography>

            <StyledAutoComplete
              title={"Gas Tank Name"}
              placeholder="Search stock"
              suggestedList={suggestedTankList}
              setSuggestedList={setSuggestedTankList}
              setSelected={setSelectedTank}
              suggessionName={"Suggested Stocks"}
              madeOf={["name", "type"]}
              keyword={keyword}
              setKeyword={setKeyword}
            />
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Gas Tank Type</Typography>
              <TextField
                size="small"
                fullWidth
                inputProps={{ readOnly: true }}
                {...register("type", {
                  required: {
                    value: true,
                    message: "Gas tank type is required",
                  },
                })}
                {...(errors.type && {
                  error: true,
                  helperText: errors.type.message,
                })}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Quantity</Typography>
              <TextField
                size="small"
                fullWidth
                {...register("quantity", {
                  required: {
                    value: true,
                    message: "Quantity is required",
                  },
                })}
                {...(errors.quantity && {
                  error: true,
                  helperText: errors.quantity.message,
                })}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Re-Order level</Typography>
              <TextField
                size="small"
                fullWidth
                {...register("reOrderLevel", {
                  required: {
                    value: true,
                    message: "Re-order level is required",
                  },
                })}
                {...(errors.reOrderLevel && {
                  error: true,
                  helperText: errors.reOrderLevel.message,
                })}
              />
            </Box>
          </Grid>

          <Grid item xs>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Stock Pricing
            </Typography>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>
                Distributor - Ordered Price
              </Typography>
              <TextField
                size="small"
                fullWidth
                inputProps={{ readOnly: true }}
                {...register("orderedPriceDistributor", {
                  required: {
                    value: true,
                    message: "Gas tank type is required",
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Ordered price should be a number",
                  },
                })}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>
                Distributor - Selling Price
              </Typography>
              <TextField
                size="small"
                fullWidth
                inputProps={{ readOnly: true }}
                {...register("sellingPriceDistributor", {
                  required: {
                    value: true,
                    message: "Selling price is required",
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Selling price should be a number",
                  },
                })}
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>
                Dealer - Ordered Price
              </Typography>
              <TextField
                size="small"
                fullWidth
                inputProps={{ readOnly: true }}
                {...register("orderedPriceDealer", {
                  required: {
                    value: true,
                    message: "Ordered price is required",
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Ordered price should be a number",
                  },
                })}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>
                Dealer - Selling Price
              </Typography>
              <TextField
                size="small"
                fullWidth
                inputProps={{ readOnly: true }}
                {...register("sellingPriceDealer", {
                  required: {
                    value: true,
                    message: "Selling price is required",
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Selling price should be a number",
                  },
                })}
              />
            </Box>
          </Grid>
        </Grid>

        <Box pt={3} display="flex" justifyContent={"end"} gap={3}>
          <Button variant="outlined" sx={{ px: 5 }}>
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Box>
      </ContentCard>
    </Box>
  );
};

export default NewStock;
