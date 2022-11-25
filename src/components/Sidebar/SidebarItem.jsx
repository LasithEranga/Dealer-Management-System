import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SidebarItem = ({ icon, title, isSelected = false }) => {
  return (
    <Box
      display="flex"
      gap={2}
      color={isSelected ? "white" : "#B1B2B9"}
      py={1}
      mr={1}
      pl={1.5}
      sx={{
        ...(isSelected && { backgroundColor: "#656777", borderRadius: 1 }),
        "&:hover": {
          backgroundColor: "#46485A",
          cursor: "pointer",
          borderRadius: 1,
        },
      }}
    >
      <Box display={"flex"} alignItems="center">
        {icon}
      </Box>
      <Box display={"flex"} alignItems="center">
        <Typography fontSize="0.8rem">{title}</Typography>
      </Box>
    </Box>
  );
};

export default SidebarItem;
