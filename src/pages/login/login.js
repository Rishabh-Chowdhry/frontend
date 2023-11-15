import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../stores";
import apiClient from "../../Instances/client";
const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const username = useSelector((state) => state.auth.username);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      const res = await apiClient.post("/login", {
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;

      // Assuming your API response contains a 'token' field
      const token = data.token;
      console.log("Tokenn", token);
      // Dispatch the login action with the token payload
      if (token) {
        sessionStorage.setItem("token", res.data.token);
        dispatch(authActions.login({ token }));
      }

      // Log the response data for debugging
      console.log(data);

      // Redirect to the dashboard
      history("/dashboard");
    } catch (error) {
      console.log(error); // Log the error for debugging
      throw error; // Throw the error to be caught in the calling code
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your login logic, perhaps an API call
      // If successful, dispatch the login action
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => history("/dashboard"));
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle other error-related tasks
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>

          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
