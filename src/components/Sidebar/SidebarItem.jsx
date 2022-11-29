import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, title, path }) => {
  const location = useLocation();
  const currentPathname = location.pathname.substring(1);

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(path);
      }}
    >
      <Box
        display="flex"
        gap={2}
        color={currentPathname === path ? "white" : "#B1B2B9"}
        py={1}
        mr={1}
        pl={1.5}
        sx={{
          ...(currentPathname === path && {
            backgroundColor: "#656777",
            borderRadius: 0.5,
          }),
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
    </div>
  );
};

export default SidebarItem;
