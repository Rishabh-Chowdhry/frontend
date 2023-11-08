import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TranslateIcon from "@mui/icons-material/Translate";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleSearch = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  const handleLanguageMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#f3f3f3",
        width: "100%",
        display: "flex", // Use flex container to align children
        flexDirection: "row", // Layout children in a row
        alignItems: "flex-end", // Align items vertically in the center
        justifyContent: "flex-end", // Align items to the start of the container
        // padding: "0 20px", // Padding on both sides
      }}
    >
      {/* Search Icon and Input field */}
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <IconButton
          onClick={toggleSearch}
          sx={{
            cursor: "pointer",
            marginRight: 1,
            "&:hover": {
              backgroundColor: " #ff4013",
              color: "#fff",
              borderRadius: 0,
            },
          }}
        >
          <SearchIcon />
        </IconButton>
        {showSearch && (
          <InputBase
            placeholder="Search..."
            autoFocus
            sx={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "5px 10px",
              marginRight: "20px", // Space after the search box
            }}
          />
        )}
      </Box>

      {/* Other Icons */}

      <IconButton
        onClick={handleLanguageMenu}
        onMouseOver={handleLanguageMenu}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: " #ff4013",
            color: "#fff",
            borderRadius: 0,
          },
          marginRight: "10px",
        }}
      >
        <TranslateIcon />
        <Typography fontSize={"12px"} fontWeight={600}>
          EN
        </Typography>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>English</MenuItem>
        <MenuItem onClick={handleClose}>Español</MenuItem>
        <MenuItem onClick={handleClose}>Français</MenuItem>
        {/* More languages */}
      </Menu>
      <IconButton
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: " #ff4013",
            color: "#fff",
            borderRadius: 0,
          },
        }}
      >
        <AccountCircleOutlinedIcon />
        <Typography fontSize={"12px"} fontWeight={600}>
          Login
        </Typography>
      </IconButton>
    </AppBar>
  );
};

export default Navbar;
