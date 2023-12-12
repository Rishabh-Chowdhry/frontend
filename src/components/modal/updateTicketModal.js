import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import apiClient from "../../Instances/client";

const UpdateTicketModal = forwardRef((props, ref) => {
  const { onClose, ticketToUpdate } = props;
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
  const [user, setUser] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await apiClient.get("/user");
      const data = res.data;

      // Assuming the user object has firstname and lastname properties
      setUser({
        firstname: data.user.firstname,
      });
    } catch (error) {
      console.error("Error in sendRequest:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    // Set createdBy field when user data is available
    if (user) {
      setTicketData((prevData) => ({
        ...prevData,
        createdBy: user.firstname,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (ticketToUpdate) {
      setTicketData(ticketToUpdate);
      setOpen(true); // Open the modal when ticketToUpdate is set
    }
  }, [ticketToUpdate]);

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    setTicketData({
      ticketName: "",
      ticketContent: "",
      ticketPriority: "",
      createdBy: "",
      status: "Open",
      escalationLevel: "Normal",
    });
    setError(null);
    onClose();
  };

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

      await apiClient.put(`/update-ticket/${ticketToUpdate._id}`, {
        ...ticketData,
      });

      console.log("Ticket updated");

      handleClose();
    } catch (error) {
      console.error("Error updating ticket:", error);
      setError("Failed to update ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Ticket</DialogTitle>
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
          fullWidth
          margin="normal"
          disabled // Disable the createdBy field for updates
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={ticketData.status}
            onChange={handleChange}
            sx={{
              mt: 1,
            }}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              mt: 1,
            }}
          >
            Escalation Level
          </InputLabel>
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
            color: "white",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#0d2e4e",
              fontWeight: 550,
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
            color: "white",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#0d2e4e",
              fontWeight: 550,
              color: "#fff",
            },
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Ticket"}
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

export default UpdateTicketModal;
