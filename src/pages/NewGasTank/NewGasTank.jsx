import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import { useForm } from "react-hook-form";
import { newTank } from "../../app/api/gasTankServices";
const NewGasTank = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
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
    newTank(data, (response) => {
      console.log(response);
      clearAll();
    });
  };

  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          New Gas Tank
        </Typography>
      </Box>
      <ContentCard sx={{ mr: 1 }}>
        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Gas Tank Details
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Gas Tank Name</Typography>
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
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Tank Type</Typography>
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
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Distributor Pricing
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Ordered Price</Typography>
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
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Selling Price</Typography>
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
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Dealer Pricing
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Ordered Price</Typography>
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
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Selling Price</Typography>
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
          </Grid>
        </Grid>
        <Box display="flex" justifyContent={"end"} gap={3} pt={4} pb={2}>
          <Button variant="outlined" sx={{ px: 5 }} onClick={clearAll}>
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

export default NewGasTank;
