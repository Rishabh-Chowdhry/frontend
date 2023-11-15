import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Modal,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for form validation
import { Create as CreateIcon } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #172554",
  boxShadow: 24,
  p: 4,
  mt: 4,
};
const formSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  type: Yup.string().required("Type is required"),
});

const createForm = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton>
                <CreateIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">Form Management</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 5 }}>
            <Grid item>
              <Button
                variant="contained"
                // onClick={handleOpenModal}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Create Form
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                // onClick={handleOpenModal}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Edit Form
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default createForm;
