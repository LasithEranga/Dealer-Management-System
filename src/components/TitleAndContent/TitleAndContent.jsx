import { Box, Typography } from "@mui/material";
import React from "react";

const TitleAndContent = ({
  title,
  content,
  titleSx = {},
  contentSx = {},
  sx = {},
}) => {
  return (
    <Box display={"flex"} sx={{ color: "#848484", ...sx }}>
      <Typography fontSize={"0.9rem"} fontWeight="bold" sx={titleSx}>
        {title}
      </Typography>
      <Typography
        fontSize={"0.9rem"}
        fontWeight="bold"
        sx={{ ml: 1, ...contentSx }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default TitleAndContent;
