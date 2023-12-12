import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import apiClient from "../../Instances/client";

const CreateTicketModal = forwardRef((props, ref) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    ticketName: "",
    ticketContent: "",
    ticketPriority: "",
    createdBy: "",
    status: "Open",
    escalationLevel: "Normal",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await apiClient.get("/user");
      const data = res.data;
      console.log("User data response:", data);

      setUser({
        firstname: data.user.firstname,
      });
    } catch (error) {
      console.error("Error in sendRequest:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (open) {
      // Only send the request when the modal is open
      sendRequest();
    }
  }, [open]);

  useEffect(() => {
    if (user) {
      setTicketData((prevData) => ({
        ...prevData,
        createdBy: user.firstname,
      }));
    }
  }, [user]);

  const { onClose } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post("/create-tickets", ticketData);
      console.log("Ticket created:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error creating ticket:", error);
      setError("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Ticket</DialogTitle>
      <DialogContent>
        <TextField
          label="Ticket Name"
          name="ticketName"
          value={ticketData.ticketName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ticket Content"
          name="ticketContent"
          value={ticketData.ticketContent}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ticket Priority"
          name="ticketPriority"
          value={ticketData.ticketPriority}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Created By"
          name="createdBy"
          value={ticketData.createdBy}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={ticketData.status}
            onChange={handleChange}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Escalation Level</InputLabel>
          <Select
            name="escalationLevel"
            value={ticketData.escalationLevel}
            onChange={handleChange}
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4013",
            "&:hover": {
              backgroundColor: "#0d2e4e",
              color: "#fff",
            },
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4013",
            "&:hover": {
              backgroundColor: "#0d2e4e",
              color: "#fff",
            },
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Ticket"}
        </Button>
      </DialogActions>
      {error && (
        <DialogContent>
          <Typography color="error">{error}</Typography>
        </DialogContent>
      )}
    </Dialog>
  );
});

export default CreateTicketModal;
