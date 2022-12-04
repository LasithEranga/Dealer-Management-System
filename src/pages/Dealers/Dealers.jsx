import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAllDealers, newDealer } from "../../app/api/userServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import CustomModal from "../../components/CustomModal/CustomModal";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";

const Dealers = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearAll = () => {
    resetField("name");
    resetField("email");
    resetField("phoneNumber");
    resetField("address");
    resetField("storeAddress");
    resetField("outstandingAmount");
  };

  const onSubmit = (data) => {
    console.log(data);
    data["password"] = Math.random() * 12458;
    data["type"] = "DEALER";
    newDealer(data, (response) => {
      console.log(response);
      clearAll();
      setShowEditModal(false);
      setRefreshTable((prev) => !prev);
    });
  };

  const setValues = (
    _id,
    name,
    email,
    phoneNumber,
    address,
    storeAddress,
    outstandingAmount
  ) => {
    console.log(_id);

    setValue("name", name);
    setValue("email", email);
    setValue("phoneNumber", phoneNumber);
    setValue("address", address);
    setValue("storeAddress", storeAddress);
    setValue("outstandingAmount", outstandingAmount);
  };

  const createData = (
    name,
    outstandingAmount,
    email,
    phoneNumber,
    address,
    storeAddress
  ) => {
    return {
      name,
      address,
      storeAddress,
      phoneNumber,
      email,
      outstandingAmount,
    };
  };

  useEffect(() => {
    getAllDealers((response) => {
      console.log(response);
      setDealers(
        response.users.map((oneEl) =>
          createData(
            oneEl.name,
            oneEl.outstandingAmount,
            oneEl.email,
            oneEl.phoneNumber,
            oneEl.address,
            oneEl.storeAddress
          )
        )
      );
    });
  }, [refreshTable]);

  return (
    <div>
      <CustomModal open={showEditModal} setOpen={setShowEditModal}>
        <Box mb={2}>
          <Typography fontSize="1.5rem" fontWeight="bold">
            Add Dealer
          </Typography>
        </Box>
        <Box sx={{ maxHeight: "30rem", overflow: "auto" }} pr={2}>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Dealer Name
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
              Email Address
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("email", {
                required: {
                  value: true,
                  message: "Gas tank name is required",
                },
              })}
              {...(errors.email && {
                error: true,
                helperText: errors.email.message,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Phone Number
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Phone number is required",
                },
              })}
              {...(errors.phoneNumber && {
                error: true,
                helperText: errors.phoneNumber.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Address
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              {...(errors.address && {
                error: true,
                helperText: errors.address.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Store Address
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("storeAddress", {
                required: {
                  value: true,
                  message: "Store address is required",
                },
              })}
              {...(errors.storeAddress && {
                error: true,
                helperText: errors.storeAddress.message,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Outstanding Amount
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("outstandingAmount", {
                required: {
                  value: true,
                  message: " Outstanding amount is required",
                },
              })}
              {...(errors.outstandingAmount && {
                error: true,
                helperText: errors.outstandingAmount.message,
              })}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent={"end"} gap={1} pt={3} pb={1}>
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
            Save
          </Button>
        </Box>
      </CustomModal>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Dealers
        </Typography>
        <Box>
          <Button>Download PDF</Button>
          <Button
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            Add Dealer
          </Button>
        </Box>
      </Box>
      <Box>
        <ContentCard>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Search for dealer
                </Typography>
                <TextField fullWidth size="small" placeholder="Dealer name" />
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Sort By
                </Typography>
                <FormControl fullWidth size="small">
                  <Select>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Outstanding Balance
                </Typography>
                <Box display={"flex"} gtap={2}>
                  <FormControl fullWidth size="small">
                    <TextField size="small" placeholder="min: Rs:2000.00" />
                  </FormControl>
                  <Box mx={2}>
                    <Typography fontSize="1.5rem" fontWeight={"bold"}>
                      {" "}
                      -{" "}
                    </Typography>
                  </Box>
                  <FormControl fullWidth size="small">
                    <TextField size="small" placeholder="Max: Rs:50000.00" />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ContentCard>
      </Box>

      {/* --------------------------- table section ------------------------------- */}
      <Box mt={2}>
        <ContentCard>
          <EnhancedTable data={dealers} />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default Dealers;
