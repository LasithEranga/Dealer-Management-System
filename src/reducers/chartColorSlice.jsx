import { createSlice } from "@reduxjs/toolkit";

export const chartColorsSlice = createSlice({
  name: "chartColors",
  initialState: {
    tankTypeColors: {
      NEW: "#34cba9",
      RETURNED: "#ff8000",
    },
  },
  reducers: {
    setTankTypeColors: (state, action) => {
      state.tankTypeColors = action.payload.tankTypeColors;
    },
  },
});

export const { setTankTypeColors } = chartColorsSlice.actions;
export default chartColorsSlice.reducer;
