// ViewFormModal.jsx

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function ViewFormModal({ viewOpen, setViewOpen, formDetails }) {
  return (
    <Dialog
      onClose={() => setViewOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={viewOpen}
    >
      <DialogTitle id="customized-dialog-title">View Form</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setViewOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {/* Display form details here */}
        <Typography variant="body1">Form Title: {formDetails.title}</Typography>
        <Typography variant="body1">
          Created By: {formDetails.createdBy}
        </Typography>

        {/* Display fields here */}
        <Typography variant="h6">Fields:</Typography>
        {formDetails.fields.map((field, index) => (
          <div key={index}>
            <Typography variant="body1">{`Field ${index + 1} Label: ${
              field.label
            }`}</Typography>
            <Typography variant="body1">{`Is Appendable: ${field.isAppendable}`}</Typography>
            <Typography variant="body1">{`Is Editing: ${field.isEditing}`}</Typography>
            <Typography variant="body1">{`Is Disabled: ${field.isDisabled}`}</Typography>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setViewOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
