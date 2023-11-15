import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import apiClient from "../../Instances/client";
const data = [
  { name: "Service A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Service B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Service C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Service D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Service E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Service F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Service G", uv: 3490, pv: 4300, amt: 2100 },
];
axios.defaults.withCredentials = true;
let firstRender = true;
const Home = () => {
  const [user, setUser] = useState();

  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/refresh", {
        withCredentials: true,
      });

      if (!res || !res.data) {
        console.error("Response or data is undefined:", res);
        throw new Error("Response or data is undefined");
      }

      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error in refreshToken:", error.message);
      throw error;
    }
  };

  const sendRequest = async () => {
    try {
      const res = await apiClient.get("/user", {
        withCredentials: true,
      });
      const data = res.data;

      if (data) {
        return data;
      } else {
        console.error("Data is undefined");
      }
    } catch (error) {
      console.error("Error in sendRequest:", error.message);
      throw error;
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!initialDataFetched) {
  //       const data = await sendRequest();
  //       setUser(data.user);
  //       setInitialDataFetched(true);
  //     }
  //   };

  //   fetchData();

  //   // Set up the interval only after the initial data is fetched
  //   if (initialDataFetched) {
  //     const interval = setInterval(() => {
  //       refreshToken().then((data) => setUser(data.user));
  //     }, 1000 * 29);

  //     // Clear the interval when the component unmounts
  //     return () => clearInterval(interval);
  //   }
  // }, [initialDataFetched]);
  useEffect(() => {
    const fetchData = async () => {
      if (!initialDataFetched) {
        const data = await sendRequest();
        setUser(data.user);
        setInitialDataFetched(true);
      }
    };

    fetchData();

    // Set up the interval only after the initial data is fetched
    const interval = setInterval(() => {
      if (initialDataFetched) {
        refreshToken().then((data) => setUser(data.user));
      }
    }, 1000 * 10);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Welcome {user?.firstname} {user?.lastname}!{" "}
        </Typography>
        <Grid container spacing={3}>
          {/* Ticket Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Open Tickets
                </Typography>
                <Typography variant="h5">15</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* User Detail Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  New Users
                </Typography>
                <Typography variant="h5">8</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Completed Tickets Count */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed Tickets
                </Typography>
                <Typography variant="h5">26</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Escalated Tickets Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Escalated Tickets
                </Typography>
                <Typography variant="h5">3</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Best Services
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#ff4013" />
                  <Bar dataKey="uv" fill="#0d2e4e" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Other Stats */}
          <Grid item xs={12} md={4} lg={12}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Stats
                </Typography>
                <Box display="flex" alignItems="center">
                  <CheckCircleIcon color="success" />
                  <Typography variant="subtitle1" gutterBottom>
                    150 Resolved Issues
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <WarningIcon color="error" />
                  <Typography variant="subtitle1" gutterBottom>
                    5 Escalated Issues
                  </Typography>
                </Box>
                {/* Add more stats here */}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
