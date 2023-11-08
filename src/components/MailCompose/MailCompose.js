import React, { useState } from "react";
import { Button, TextField, Paper, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileUpload from "../FileUpload/FileUpload";

const MailCompose = ({ onSendEmail }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null); // State to hold the uploaded file

  const handleSend = () => {
    const emailData = {
      to,
      subject,
      content,
      attachment,
    };
    onSendEmail(emailData);
    // Resetting the state after sending an email
    setTo("");
    setSubject("");
    setContent("");
    setAttachment(null);
  };

  // Function to handle file selection
  const handleFileSelect = (file) => {
    setAttachment(file);
  };

  return (
    <Paper style={{ padding: "20px" }}>
      <TextField
        label="To"
        fullWidth
        margin="normal"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        label="Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Stack
        direction={"row"}
        spacing={4}
        sx={{
          mt: 2,
        }}
      >
        <Box marginY={2}>
          <FileUpload onFileSelect={handleFileSelect} />
          {attachment && (
            <Box marginTop={2}>
              <img
                src={URL.createObjectURL(attachment)}
                alt="Attachment"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSend}
        >
          Send
        </Button>
        {/* File Upload Section */}
      </Stack>
    </Paper>
  );
};

export default MailCompose;
