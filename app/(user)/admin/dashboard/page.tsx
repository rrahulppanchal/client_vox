import { Box, Divider, Grid, Typography } from "@mui/joy";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Grid sm={12}>
        <Grid paddingLeft={2}>
          <Typography level="h2" component="h1" sx={{ pt: 1, mb: 2 }}>
            Admin - Dashboard
          </Typography>
        </Grid>
        <Divider />
        <Grid paddingLeft={2}>
          <Typography>Content</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
