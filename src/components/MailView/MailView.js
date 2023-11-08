import React from "react";
import { Box, Paper, Typography, IconButton, Divider } from "@mui/material";
import { Delete, RestoreFromTrash } from "@mui/icons-material";
// MailView component to view the content of a selected email
const MailView = ({ email, onDeleteEmail, onRestoreEmail }) => (
  <Paper style={{ padding: "20px" }}>
    <Typography variant="h5">{email.subject}</Typography>
    <Typography variant="subtitle1" color="textSecondary">
      From: {email.from}
    </Typography>
    <Divider style={{ margin: "20px 0" }} />
    <Typography>{email.content}</Typography>
    <Box display="flex" justifyContent="flex-end" mt={2}>
      {onDeleteEmail && (
        <IconButton aria-label="delete" onClick={() => onDeleteEmail(email.id)}>
          <Delete />
        </IconButton>
      )}
      {onRestoreEmail && (
        <IconButton
          aria-label="restore"
          onClick={() => onRestoreEmail(email.id)}
        >
          <RestoreFromTrash />
        </IconButton>
      )}
    </Box>
  </Paper>
);

export default MailView;
