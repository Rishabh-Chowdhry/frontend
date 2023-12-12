import React from "react";
import {
  Card,
  Grid,
  IconButton,
  Typography,
  Button,
  CardContent,
} from "@mui/material";
import { ReportTable } from "../../components";

const Reportbuilder = () => {
  return (
    <>
      {/* <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton>
                <CreateIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">Reports Builder</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 5 }}>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleGenerateReport}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      <ReportTable />
    </>
  );
};

export default Reportbuilder;
