import { Box, Grid, Typography } from "@mui/material";
import logo from "../../asessts/logo.png";

// Create Document Component
function ReportLayout({
  children,
  title = "Sales Report",
  from,
  to,
  subHeading,
}) {
  return (
    <Box p={2} px={6} pt={6} sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} justifyContent="space-between">
        <Box>
          <Box>
            <img src={logo} alt="logo" width={"100px"} height={"30px"} />
          </Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              mt: 1,
            }}
          >
            {subHeading}
          </Typography>
        </Box>
        <Box width={"200px"} ml={0.3} mt={1}>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item lg>
              From
            </Grid>
            <Grid item lg={6}>
              :{" "}
              {from.length > 0
                ? new Date(from).toLocaleDateString("en-uk")
                : ""}
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item lg>
              To
            </Grid>
            <Grid item lg={6}>
              : {to.length > 0 ? new Date(to).toLocaleDateString("en-uk") : ""}
            </Grid>
          </Grid>
        </Box>
      </Box>

      {children}
    </Box>
  );
}
export default ReportLayout;
