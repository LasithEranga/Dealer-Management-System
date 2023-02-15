import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Calendar from "./Calendar";

const Test = () => {
  const [refreshCalendar, setRefreshCalendar] = React.useState(false);
  return (
    <Box>
      <Box
        sx={{
          width: "360px",
        }}
      >
        <Calendar
          availableSessions={[
            {
              Id: 290149,
              TimeStart: "2023-02-13T07:00:00",
              TimeEnd: "2023-02-13T10:00:00",
              Type: 2,
            },
          ]}
          refreshCalendar={refreshCalendar}
          setRefreshCalendar={setRefreshCalendar}
        />
      </Box>
    </Box>
  );
};

export default Test;
