import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    userId: "",
    name: "",
    email: "",
    type: "",
    outstandingAmount: 0,
    distributor: "",
    jwt: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.type = action.payload.type;
      state.outstandingAmount = action.payload.outstandingAmount;
      state.distributor = action.payload.distributor;
      state.jwt = action.payload.jwt;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.name = "";
      state.email = "";
      state.type = "";
      state.outstandingAmount = 0;
      state.distributor = "";
      state.jwt = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
