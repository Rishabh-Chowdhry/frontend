import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ width: "100%", bgcolor: "#E8EBE6", color: "white", mt: 5 }}>
      <Container sx={{}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={5}
        >
          <Box display="flex" flexDirection="column" alignItems="start">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              <Box
                component="img"
                src={"/assets/images/logo.png"}
                sx={{
                  width: "100px",
                }}
                alt=" Logo"
              />
            </Typography>
          </Box>
          <Box>
            <Link href="#" color="#000" sx={{ mr: 4 }}>
              About
            </Link>
            <Link href="#" color="#000" sx={{ mr: 4 }}>
              Terms
            </Link>
            <Link href="#" color="#000" sx={{ mr: 4 }}>
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
      <Box textAlign="center" p={1} color="#000">
        Copyright © 2023{" "}
        <Box component="span" fontWeight="bold">
          TeleCard Pvt ltd.
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
