import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const ViewTicketModal = forwardRef((props, ref) => {
  const { onClose, ticketToView } = props;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    },
  }));

  useEffect(() => {
    if (ticketToView) {
      setOpen(true);
    }
  }, [ticketToView]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
    >
      {ticketToView ? (
        <>
          <DialogTitle>View Ticket</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">Ticket Name</Typography>
            <TextField
              value={ticketToView?.ticketName}
              disabled
              margin="normal"
              fullWidth
              sx={{ cursor: "not-allowed" }}
            />
            <Typography variant="body1">Ticket Content </Typography>
            <TextField
              value={ticketToView?.ticketContent}
              disabled
              margin="normal"
              fullWidth
              sx={{ cursor: "not-allowed" }}
            />
            <Typography variant="body1">Ticket Priority</Typography>
            <TextField
              value={ticketToView?.ticketPriority}
              disabled
              fullWidth
              margin="normal"
              sx={{ cursor: "not-allowed" }}
            />
            <Typography variant="body1">Created By</Typography>
            <TextField
              value={ticketToView?.createdBy}
              disabled
              fullWidth
              margin="normal"
              sx={{ cursor: "not-allowed" }}
            />
            <Typography variant="body1">Status</Typography>
            <TextField
              value={ticketToView?.status}
              fullWidth
              disabled
              margin="normal"
              sx={{ cursor: "not-allowed" }}
            />
            <Typography variant="body1">Escalation Level</Typography>
            <TextField
              value={ticketToView?.escalationLevel}
              disabled
              fullWidth
              margin="normal"
              sx={{ cursor: "not-allowed" }}
            />
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
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Dialog>
  );
});

ViewTicketModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  ticketToView: PropTypes.shape({
    ticketName: PropTypes.string,
    ticketContent: PropTypes.string,
    ticketPriority: PropTypes.string,
    createdBy: PropTypes.string,
    status: PropTypes.string,
    escalationLevel: PropTypes.string,
  }),
};

ViewTicketModal.defaultProps = {
  ticketToView: null,
};

export default ViewTicketModal;
