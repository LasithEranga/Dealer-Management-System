import { createSlice } from "@reduxjs/toolkit";

export const chartColorsSlice = createSlice({
  name: "chartColors",
  initialState: {
    tankTypeColors: {
      NEW: "#315aa8",
      RETURNED: "#3297cd",
      EMPTY: "#c1335a",
      REFILLED: "#dce62b",
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
