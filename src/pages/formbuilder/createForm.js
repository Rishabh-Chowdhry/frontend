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
  MenuItem,
  Stack,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup"; // Import Yup for form validation
import { Create as CreateIcon } from "@mui/icons-material";
import apiClient from "../../Instances/client";
const initialValues = {
  title: "",
  fields: [{ label: "", type: "" }], // Initialize fields as an array of objects
};
const formSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  fields: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required("Label is required"),
        type: yup.string().required("Type is required"),
      })
    )
    .required("At least one field is required"),
});

const CreateForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
  });
  const [CreateFormModal, setCreateFormModal] = useState(false);
  const handleOpenModal = () => {
    setCreateFormModal(true);
  };

  const handleCloseModal = () => {
    setCreateFormModal(false);
  };
const handleCreateForm=async()=>{
 try{
  const response = await apiClient.post('/create-forms', formik.values);
    console.log(response.data,"form data creation ")
 }catch(error){
  console.error('Error creating form:', error.message);
 }
}
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
                onClick={handleOpenModal}
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
                View Created Form
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal open={CreateFormModal} onClose={handleCloseModal} sx={{}}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            border: "1px solid #172554 ",
            boxShadow: 24,
            paddingLeft: 6,
            mt: 4,
            maxHeight: "80vh", // Set maximum height to enable scrolling,
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            textAlign={"center"}
            sx={{ mt: 3 }}
          >
            Create Form
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "#172554 " }}
          >
            Title
          </Typography>
          <Grid item xs={12}>
            <TextField
              name="title"
              sx={{ width: "100%" }}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          {formik.values.fields.map((field, index) => (
            <div key={index}>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, color: "#172554 " }}
              >
                Label
              </Typography>
              <Grid item xs={12}>
                <TextField
                  name={`fields[${index}].label`}
                  sx={{ width: "100%" }}
                  value={field.label}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fields &&
                    Boolean(formik.errors.fields?.[index]?.label)
                  }
                  helperText={
                    formik.touched.fields &&
                    formik.errors.fields?.[index]?.label
                  }
                />
              </Grid>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, color: "#172554 " }}
              >
                Type
              </Typography>
              <Grid item xs={12}>
                <TextField
                  name={`fields[${index}].type`}
                  select
                  sx={{ width: "100%" }}
                  value={field?.type}
                  error={
                    formik.touched.fields &&
                    Boolean(formik.errors.fields?.[index]?.type)
                  }
                  helperText={
                    formik.touched.fields &&
                    //@ts-ignore
                    formik.errors.fields?.[index]?.type
                  }
                  onChange={formik.handleChange}
                >
                  <MenuItem value="text">Text Field</MenuItem>
                  <MenuItem value="checkbox">Check box</MenuItem>
                  <MenuItem value="radiobutton">Radio Button</MenuItem>
                  <MenuItem value="number">Number Field</MenuItem>
                  <MenuItem value="password">Password Field</MenuItem>
                  <MenuItem value="email">Email Field</MenuItem>
                  <MenuItem value="button">Button</MenuItem>
                </TextField>
              </Grid>
            </div>
          ))}
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              type="button"
              onClick={() =>
                formik.setValues({
                  ...formik.values,
                  fields: [...formik.values.fields, { label: "", type: "" }],
                })
              }
              variant="contained"
              sx={{
                mt: 4,
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
                backgroundColor: "#ff4013",
                "&:hover": {
                  backgroundColor: "#0d2e4e",
                  color: "#fff",
                },
              }}
            >
              Add Field
            </Button>

            <Button
              variant="contained"
              type="submit"
              onClick={handleCreateForm}
              sx={{
                mt: 4,
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
                backgroundColor: "#ff4013",
                "&:hover": {
                  backgroundColor: "#0d2e4e",
                  color: "#fff",
                },
              }}
            >
              Create Form
            </Button>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default CreateForm;
