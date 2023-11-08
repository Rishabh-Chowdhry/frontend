import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EmailIcon from "@mui/icons-material/Email";
import ReportIcon from "@mui/icons-material/Report";
import SendIcon from "@mui/icons-material/Send";
import { MailCompose, MailView } from "../../components";
// A simple mock function to simulate unique IDs for emails
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock data for emails
const initialEmails = [
  {
    id: generateId(),
    subject: "Team Meeting",
    from: "boss@example.com",
    content: "Don’t forget our meeting.",
    category: "all",
  },
  {
    id: generateId(),
    subject: "Spam Offer",
    from: "spam@example.com",
    content: "You won a prize!",
    category: "junk",
  },
  // ... more emails
];

const categories = {
  all: "All Mails",
  junk: "Junk Mail",
  trash: "Trash",
};

const EmailTabs = ({ currentCategory, onChangeCategory }) => (
  <Tabs
    value={currentCategory}
    onChange={(event, newValue) => onChangeCategory(newValue)}
    centered
  >
    {Object.entries(categories).map(([key, label]) => (
      <Tab key={key} label={label} value={key} />
    ))}
  </Tabs>
);

const EmailList = ({ emails, onSelectEmail, currentCategory }) => (
  <List>
    {emails
      .filter((email) => email.category === currentCategory)
      .map((email, index) => (
        <ListItem key={index} button onClick={() => onSelectEmail(email)}>
          <ListItemText
            primary={email.subject}
            secondary={`From: ${email.from}`}
          />
        </ListItem>
      ))}
  </List>
);

// ... Other components (MailItem, MailView, MailCompose) remain the same as the previous example

const Mailbox = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState(initialEmails);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  const handleChangeCategory = (newCategory) => {
    setCurrentCategory(newCategory);
    setSelectedEmail(null); // Deselect email when changing categories
  };

  const handleDeleteEmail = (emailId) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === emailId) {
        return { ...email, category: "trash" };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const handleRestoreEmail = (emailId) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === emailId) {
        return { ...email, category: "all" };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const handleSendEmail = (email) => {
    setEmails([{ ...email, id: generateId(), category: "all" }, ...emails]);
  };

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <EmailTabs
        currentCategory={currentCategory}
        onChangeCategory={handleChangeCategory}
      />
      <Box display="flex" justifyContent="space-between">
        <Box width="30%">
          <EmailList
            emails={emails}
            onSelectEmail={handleSelectEmail}
            currentCategory={currentCategory}
          />
        </Box>
        <Box width="65%">
          {selectedEmail && currentCategory !== "trash" ? (
            <MailView email={selectedEmail} onDeleteEmail={handleDeleteEmail} />
          ) : selectedEmail && currentCategory === "trash" ? (
            // Trash view with a restore option
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h5">{selectedEmail.subject}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                From: {selectedEmail.from}
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              <Typography>{selectedEmail.content}</Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <IconButton
                  aria-label="restore"
                  onClick={() => handleRestoreEmail(selectedEmail.id)}
                >
                  <RestoreFromTrashIcon />
                </IconButton>
              </Box>
            </Paper>
          ) : (
            <MailCompose onSendEmail={handleSendEmail} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Mailbox;
