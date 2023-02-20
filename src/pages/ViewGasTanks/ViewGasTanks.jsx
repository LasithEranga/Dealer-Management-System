import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showSystemAlert } from "../../app/alertServices";
import { getAllTanks, updateTank } from "../../app/api/gasTankServices";
import CustomModal from "../../components/CustomModal/CustomModal";
import ErrorText from "../../components/ErrorText/ErrorText";
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
    updateTank(data, (response) => {
      if (response.status === 0) {
        showSystemAlert(response.message, "success");
        clearAll();
        setShowEditModal(false);
        setUpdatingTankId("");
      } else {
        showSystemAlert(response.error, "error");
      }
    });
  };

  const setValues = (
    _id,
    name,
    type,
    orderedPriceDistributor,
    sellingPriceDistributor,
    orderedPriceDealer,
    sellingPriceDealer
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
              Tank Name{" "}
              {errors.name && <ErrorText message={errors.name.message} />}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("name", {
                required: {
                  value: true,
                  message: "gas tank name is required",
                },
              })}
              {...(errors.name && {
                error: true,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Tank Type{" "}
              {errors.type && <ErrorText message={errors.type.message} />}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("type", {
                required: {
                  value: true,
                  message: "gas tank type is required",
                },
              })}
              {...(errors.type && {
                error: true,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Ordered Price - Distributor{" "}
              {errors.orderedPriceDistributor && (
                <ErrorText message={errors.orderedPriceDistributor.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("orderedPriceDistributor", {
                required: {
                  value: true,
                  message: "ordered price is required",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Ordered price should be a number",
                },
              })}
              {...(errors.orderedPriceDistributor && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Selling Price - Distributor{" "}
              {errors.sellingPriceDistributor && (
                <ErrorText message={errors.sellingPriceDistributor.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("sellingPriceDistributor", {
                required: {
                  value: true,
                  message: "selling price is required",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Selling price should be a number",
                },
              })}
              {...(errors.sellingPriceDistributor && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Ordered Price - Dealer{" "}
              {errors.orderedPriceDealer && (
                <ErrorText message={errors.orderedPriceDealer.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("orderedPriceDealer", {
                required: {
                  value: true,
                  message: "ordered price is required",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Ordered price should be a number",
                },
              })}
              {...(errors.orderedPriceDealer && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Selling Price - Dealer{" "}
              {errors.sellingPriceDealer && (
                <ErrorText message={errors.sellingPriceDealer.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("sellingPriceDealer", {
                required: {
                  value: true,
                  message: "selling price is required",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Selling price should be a number",
                },
              })}
              {...(errors.sellingPriceDealer && {
                error: true,
              })}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent={"end"} gap={1} pt={2} mr={2}>
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
