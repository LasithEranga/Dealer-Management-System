import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SubHeading = ({ title }) => {
  return (
    <Box>
      <Typography fontSize="0.8rem" pl={0.4} my={2} color="#9D9EA6">
        {title}
      </Typography>
    </Box>
  );
};

export default SubHeading;
