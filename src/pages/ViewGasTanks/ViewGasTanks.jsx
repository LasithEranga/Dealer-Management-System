import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllTanks, updateTank } from "../../app/api/gasTankServices";
import CustomModal from "../../components/CustomModal/CustomModal";
import GasTankCard from "./GasTankCard";

const ViewGasTanks = () => {
  // ---------------------------- use states ------------------------------------
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatingTankId, setUpdatingTankId] = useState("");
  const [gasTanks, setGasTanks] = useState([]);
  // ---------------------------- use states ------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearAll = () => {
    resetField("name");
    resetField("type");
    resetField("orderedPriceDistributor");
    resetField("sellingPriceDistributor");
    resetField("orderedPriceDealer");
    resetField("sellingPriceDealer");
  };

  const onSubmit = (data) => {
    console.log(data);
    data["_id"] = updatingTankId;
    updateTank(data, () => {
      clearAll();
      setShowEditModal(false);
      setUpdatingTankId("");
    });
  };

  const setValues = (
    _id,
    name,
    type,
    orderedPriceDealer,
    sellingPriceDealer,
    orderedPriceDistributor,
    sellingPriceDistributor
  ) => {
    console.log(_id);
    setUpdatingTankId(_id);
    setValue("name", name);
    setValue("type", type);
    setValue("orderedPriceDistributor", orderedPriceDistributor);
    setValue("sellingPriceDistributor", sellingPriceDistributor);
    setValue("orderedPriceDealer", orderedPriceDealer);
    setValue("sellingPriceDealer", sellingPriceDealer);
  };

  // ---------------------------- use Effects ------------------------------------
  useEffect(() => {
    if (updatingTankId === "") {
      getAllTanks(
        (response) => {
          console.log(response);
          setGasTanks(response.data);
        },
        () => {}
      );
    }
  }, [updatingTankId]);
  // ---------------------------- use Effects ------------------------------------

  return (
    <>
      <CustomModal open={showEditModal} setOpen={setShowEditModal}>
        <Box mb={2}>
          <Typography fontSize="1.5rem" fontWeight="bold">
            Update Gas Tank
          </Typography>
        </Box>
        <Box sx={{ maxHeight: "30rem", overflow: "auto" }} pr={2}>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Tank Name
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("name", {
                required: {
                  value: true,
                  message: "Gas tank name is required",
                },
              })}
              {...(errors.name && {
                error: true,
                helperText: errors.name.message,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Tank Type
            </Typography>
            <TextField
              size="small"
              fullWidth
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
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Ordered Price
            </Typography>
            <TextField
              size="small"
              fullWidth
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
              {...(errors.orderedPriceDistributor && {
                error: true,
                helperText: errors.orderedPriceDistributor.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Selling Price
            </Typography>
            <TextField
              size="small"
              fullWidth
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
              {...(errors.sellingPriceDistributor && {
                error: true,
                helperText: errors.sellingPriceDistributor.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Ordered Price
            </Typography>
            <TextField
              size="small"
              fullWidth
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
              {...(errors.orderedPriceDealer && {
                error: true,
                helperText: errors.orderedPriceDealer.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Selling Price
            </Typography>
            <TextField
              size="small"
              fullWidth
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
              {...(errors.sellingPriceDealer && {
                error: true,
                helperText: errors.sellingPriceDealer.message,
              })}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent={"end"} gap={1} pt={2}>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="secondary"
            onClick={() => {
              clearAll();
              setShowEditModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </Box>
      </CustomModal>

      <Box>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          my={1}
          mb={2}
        >
          <Typography fontSize="1.5rem" fontWeight="bold">
            View Gas tanks
          </Typography>
        </Box>
        <Box>
          <Grid container columnSpacing={1.5} rowSpacing={1.5}>
            {gasTanks.map((oneEl, index) => {
              return (
                <GasTankCard
                  key={index}
                  {...oneEl}
                  setValues={setValues}
                  setShowEditModal={setShowEditModal}
                />
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ViewGasTanks;
