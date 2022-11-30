import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const useToolbar = (data) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return { searchKeyword };
};

export default useToolbar;
