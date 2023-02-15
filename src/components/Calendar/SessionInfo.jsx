import { Box, Typography } from "@mui/material";
import React from "react";

const SessionInfo = ({ title, sessions = [], onClick = () => {} }) => {
  console.log("sessions", sessions);
  return (
    <div onClick={onClick}>
      <Typography fontWeight={"bold"}>{title}</Typography>
      <Box pl={1}>
        {sessions.map((option, index) => {
          return (
            <Box
              key={index}
              display="flex"
              justifyContent={"space-between"}
              pr={2}
              p={0.5}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                console.log("clicked");
              }}
            >
              <div key={index}>{`From ${new Date(
                option.session.TimeStart
              ).toLocaleTimeString()} to ${new Date(
                option.session.TimeEnd
              ).toLocaleTimeString()}`}</div>
              <div>{/* replace with no of appointments */}</div>
            </Box>
          );
        })}
      </Box>

      {sessions.length === 0 && (
        <Box pl={1}>
          <Typography
            color={"error"}
            sx={{
              textAlign: "center",
            }}
          >
            - No {title.toLowerCase()} are available -
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SessionInfo;
