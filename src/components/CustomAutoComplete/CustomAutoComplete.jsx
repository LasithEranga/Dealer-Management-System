import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { NAMES } from "../../data";

export default function CustomAutoComplete({ width, placeholder }) {
  return (
    <Autocomplete
      freeSolo
      sx={{ width: width }}
      options={NAMES.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search dealer by name"
          label=" Search dealer by name"
        />
      )}
    />
  );
}
