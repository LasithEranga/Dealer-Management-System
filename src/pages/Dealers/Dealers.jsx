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
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import {
  getAllDealers,
  newDealer,
  updateDealer,
} from "../../app/api/userServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import CustomModal from "../../components/CustomModal/CustomModal";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import ErrorText from "../../components/ErrorText/ErrorText";

const Dealers = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [showEditModal, setShowEditModal] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [update, setUpdate] = useState({
    isUpdating: true,
    _id: "",
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pleaseSelect");
  const [outstandingBalance, setOutstandingamount] = useState({
    min: "",
    max: "",
  });

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

  //saves the dealer details
  const onSubmit = (data) => {
    console.log(data);
    data["password"] = Math.random() * 12458;
    data["type"] = "DEALER";
    data["distributor"] = userId;
    newDealer(data, (response) => {
      console.log(response);
      clearAll();
      setShowEditModal(false);
      setRefreshTable((prev) => !prev);
      showSystemAlert(response.message, "success");
    });
  };

  //updates the dealer details
  const onClickUpdate = (data) => {
    console.log(data);
    data["_id"] = update._id;
    data["distributor"] = userId;
    updateDealer(data, (response) => {
      console.log(response);
      clearAll();
      setShowEditModal(false);
      setRefreshTable((prev) => !prev);
      showSystemAlert(response.message, "success");
    });
  };

  const setValues = (data) => {
    const {
      name,
      email,
      phoneNumber,
      address,
      storeAddress,
      outstandingAmount,
    } = data;

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
    storeAddress,
    _id
  ) => {
    return {
      name,
      address,
      storeAddress,
      phoneNumber,
      email,
      outstandingAmount,
      _id,
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
            oneEl.storeAddress,
            oneEl._id
          )
        )
      );
    });
  }, [refreshTable]);

  useEffect(() => {
    if (!showEditModal) {
      clearAll();
      setUpdate({
        isUpdating: false,
        _id: "",
      });
    }
  }, [showEditModal]);

  const handleEditClick = (data) => {
    console.log(data);
    setUpdate({
      isUpdating: true,
      _id: data._id,
    });
    setValues(data);
    setShowEditModal(true);
  };

  return (
    <div>
      <CustomModal open={showEditModal} setOpen={setShowEditModal}>
        <Box mb={2}>
          <Typography fontSize="1.5rem" fontWeight="bold">
            Add Dealer
          </Typography>
        </Box>
        <Box
          sx={{ maxHeight: "30rem", overflow: "auto", scrollbarWidth: "thin" }}
          pr={2}
        >
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Dealer Name{" "}
              {errors.name && <ErrorText message={errors.name.message} />}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("name", {
                required: {
                  value: true,
                  message: "dealer name is required",
                },
              })}
              {...(errors.name && {
                error: true,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Email Address{" "}
              {errors.email && <ErrorText message={errors.email.message} />}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
              {...(errors.email && {
                error: true,
              })}
            />
          </Box>

          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Phone Number{" "}
              {errors.phoneNumber && (
                <ErrorText message={errors.phoneNumber.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "phone number is required",
                },
              })}
              {...(errors.phoneNumber && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Address{" "}
              {errors.address && <ErrorText message={errors.address.message} />}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("address", {
                required: {
                  value: true,
                  message: "address is required",
                },
              })}
              {...(errors.address && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Store Address{" "}
              {errors.storeAddress && (
                <ErrorText message={errors.storeAddress.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("storeAddress", {
                required: {
                  value: true,
                  message: "store address is required",
                },
              })}
              {...(errors.storeAddress && {
                error: true,
              })}
            />
          </Box>
          <Box>
            <Typography sx={{ my: 1 }} fontWeight="bold">
              Outstanding Amount{" "}
              {errors.outstandingAmount && (
                <ErrorText message={errors.outstandingAmount.message} />
              )}
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("outstandingAmount", {
                required: {
                  value: true,
                  message: "outstanding amount is required",
                },
              })}
              {...(errors.outstandingAmount && {
                error: true,
              })}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent={"end"} gap={1} pt={3} pb={1} pr={2}>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="secondary"
            onClick={() => {
              setShowEditModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={
              update.isUpdating
                ? handleSubmit(onClickUpdate)
                : handleSubmit(onSubmit)
            }
          >
            {update.isUpdating ? "Update" : "Save"}
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
          <Button sx={{ mr: 1, boxShadow: 0 }} variant="contained">
            Download PDF
          </Button>
          <Button
            variant="contained"
            sx={{ boxShadow: 0 }}
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
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Dealer name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Sort By
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    value={sortBy}
                    defaultValue={""}
                  >
                    <MenuItem value={"pleaseSelect"} disabled>
                      Please Select
                    </MenuItem>
                    <MenuItem value={"name"}>Name</MenuItem>
                    <MenuItem value={"address"}>Address</MenuItem>
                    <MenuItem value={"email"}>Email</MenuItem>
                    <MenuItem value={"outstandingBalance"}>
                      Outstanding Balance
                    </MenuItem>
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
                    <TextField
                      size="small"
                      placeholder="min: Rs:2000.00"
                      onChange={(e) => {
                        setOutstandingamount((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }));
                      }}
                      value={outstandingBalance.min}
                    />
                  </FormControl>
                  <Box mx={2}>
                    <Typography fontSize="1.5rem" fontWeight={"bold"}>
                      {" "}
                      -{" "}
                    </Typography>
                  </Box>
                  <FormControl fullWidth size="small">
                    <TextField
                      size="small"
                      placeholder="Max: Rs:50000.00"
                      onChange={(e) => {
                        setOutstandingamount((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }));
                      }}
                      value={outstandingBalance.min}
                    />
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
          <EnhancedTable
            data={dealers}
            actionButtons={[
              {
                name: "Edit",
                action: handleEditClick,
              },
            ]}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default Dealers;
