import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../asessts/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../app/api/userServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/loginSlice";
import { showAlert } from "../../reducers/alertSlice";
import { showSystemAlert } from "../../app/alertServices";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    userLogin(data, (response) => {
      console.log(response);
      if (response.status === 0) {
        const { _id, name, email, type, outstandingAmount } = response.data;
        dispatch(
          login({
            _id,
            name,
            email,
            type,
            outstandingAmount,
          })
        );
        showSystemAlert("Logged into the system", "success");

        navigate("/");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#dfdfdf",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          height: "33rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sx={{ backgroundColor: "#ffffff", p: 3 }}
          xs={11}
          sm={7}
          md={5}
          lg={3.8}
        >
          <img src={logo} alt="" width={"100px"} />

          <Typography
            fontWeight={"bold"}
            fontSize={"1.3rem"}
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Welcome Back
          </Typography>
          <Typography
            fontWeight={"bold"}
            fontSize={"0.8rem"}
            textAlign="center"
            color={"#909090"}
          >
            Use your email and password to login
          </Typography>

          <Box mt={5} px={4}>
            <Typography sx={{ my: 1 }} fontWeight="bold" color={"#686868"}>
              Email Address
            </Typography>
            <TextField
              size="small"
              placeholder="lasith@gmail.com"
              fullWidth
              sx={{
                "& fieldset": {
                  borderRadius: 0.2,
                },
              }}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              {...(errors.email && {
                error: true,
                helperText: errors.email.message,
              })}
            />
          </Box>
          <Box mt={3} px={4}>
            <Typography sx={{ my: 1 }} fontWeight="bold" color={"#686868"}>
              Password
            </Typography>
            <TextField
              size="small"
              placeholder="************"
              fullWidth
              type={"password"}
              sx={{
                "& fieldset": {
                  borderRadius: 0.2,
                },
              }}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              {...(errors.password && {
                error: true,
                helperText: errors.password.message,
              })}
            />
          </Box>

          <Box mt={2} px={4} display="flex" justifyContent="space-between">
            <Box display="flex" gap={1} alignItems="center">
              <input type={"checkbox"} />
              <Typography fontSize={"0.8rem"}>Remember me</Typography>
            </Box>

            <Typography fontSize={"0.8rem"}>Forgot password</Typography>
          </Box>
          <Box px={4} mt={7}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 0.5,
                backgroundColor: "#000000",
                "&:hover": {
                  backgroundColor: "#494949",
                },
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
