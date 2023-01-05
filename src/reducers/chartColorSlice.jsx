import { createSlice } from "@reduxjs/toolkit";

export const chartColorsSlice = createSlice({
  name: "chartColors",
  initialState: {
    tankTypeColors: {},
  },
  reducers: {
    setTankTypeColors: (state, action) => {
      state.tankTypeColors = action.payload.tankTypeColors;
    },
  },
});

export const { setTankTypeColors } = chartColorsSlice.actions;
export default chartColorsSlice.reducer;
