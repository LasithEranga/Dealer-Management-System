import { Box, Grid, Typography } from "@mui/material";
import logo from "../../asessts/logo.png";

// Create Document Component
function ReportLayout({ children }) {
  return (
    <Box p={2} px={6} pt={6} sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} justifyContent="space-between">
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              mt: 0,
            }}
          >
            Sales Report
          </Typography>
          <Box width={"200px"} ml={0.3}>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item lg>
                From
              </Grid>
              <Grid item lg={6}>
                : 21/02/2023
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item lg>
                To
              </Grid>
              <Grid item lg={6}>
                : 21/04/2023
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <img src={logo} alt="logo" width={"100px"} height={"30px"} />
        </Box>
      </Box>

      {children}
    </Box>
  );
}
export default ReportLayout;
