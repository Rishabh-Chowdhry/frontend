import React, { useState } from "react";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../stores";
import apiClient from "../../Instances/client";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Invalid credentials"),
  password: Yup.string().required("Invalid credentials"),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const sendRequest = async (values) => {
    try {
      const res = await apiClient.post("/login", {
        email: values.email,
        password: values.password,
      });

      const data = res.data;
      const token = data.token;

      if (token && res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        dispatch(authActions.login({ token }));

        setSnackbarSeverity("success");
        setSnackbarMessage("Login successful");
        setSnackbarOpen(true); // Open Snackbar on successful login

        const user = data.user;
        if (user && user.role) {
          const role = user.role;
          console.log("roles", role);
          if (role === "super_admin") {
            history("/dashboard");
          } else if (role === "agent") {
            history("/agent-dashboard");
          } else {
            console.error("Unknown role");
          }
        } else {
          console.error("Invalid user data");
        }
      }
    } catch (error) {
      console.log(error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Invalid credentials");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await sendRequest(values);
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <img
            src="/assets/images/logo.png"
            style={{
              width: "30%",
              height: "auto",
              marginBottom: "2rem",
              marginLeft: "35%",
              marginTop: "5vh",
            }}
            alt=""
          />
          <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Field
              as={TextField}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              margin="normal"
              sx={{ width: "100%" }}
            />
            <ErrorMessage
              sx={{ color: "red", fontWeight: 600 }}
              name="email"
              component="div"
            />

            <Field
              as={TextField}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              sx={{ width: "100%" }}
            />
            <ErrorMessage
              sx={{ color: "red", fontWeight: 600 }}
              name="password"
              component="div"
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ background: "#ff4013", width: "110%", mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </Form>
      </Formik>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
