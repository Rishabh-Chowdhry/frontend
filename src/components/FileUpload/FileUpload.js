import React from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ onFileSelect }) => {
  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="button-file"
        type="file"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
      <label htmlFor="button-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: "#0d2e4e", // Add this line for the opened state"
            "&:hover": {
              backgroundColor: " #fff",
              color: "#ff4013",
            },
          }}
        >
          Upload Image
        </Button>
      </label>
    </>
  );
};

export default FileUpload;
