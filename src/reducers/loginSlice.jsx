import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: "",
    name: "",
    email: "",
    type: "",
    outstandingAmount: 0,
    distributor: "",
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.type = action.payload.type;
      state.outstandingAmount = action.payload.outstandingAmount;
      state.distributor = action.payload.distributor;
    },
    logout: (state) => {
      state.userId = "";
      state.name = "";
      state.email = "";
      state.type = "";
      state.outstandingAmount = 0;
      state.distributor = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
