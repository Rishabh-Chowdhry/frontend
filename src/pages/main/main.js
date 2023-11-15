import React from "react";
import { Navbar, Header, Footer } from "../../components";
import { Container, Box, Typography, Button } from "@mui/material";

const main = () => {
  return (
    <>
      <Navbar />
      <Header />

      <Container sx={{ overflowY: "auto", height: "100vh", width: "100vw" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              mt: 10,
              // You may need to adjust the padding to fit your design
              p: 2,
              // Set the background color to match the image you uploaded

              // Set the text color to contrast with the background
              color: "#ff4013",
              // Additional styling to center the content
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              fontWeight: 800,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textTransform={"uppercase"}
            >
              Boost your sales
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textTransform={"uppercase"}
              color={"#0d2e4e"}
              fontWeight={800}
            >
              with optimizing your workflows
            </Typography>
            <Box
              sx={{
                "& > *": {
                  m: 1, // Margin for the buttons
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff4013",

                  "&:hover": {
                    backgroundColor: " #fff",
                    color: "#ff4013",
                  },
                }}
              >
                EXPLORE
              </Button>
            </Box>
          </Box>

          <Box
            component="img"
            src="/assets/images/citation1.png"
            sx={{ width: "400px", mt: 4 }}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default main;
