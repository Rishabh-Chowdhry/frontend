import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { DeleteOutlineRounded } from "@mui/icons-material";
import apiClient from "../../Instances/client";
import PropTypes from "prop-types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const styles = {
  dialogTitle: {
    m: 0,
    p: 2,
  },
  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
  },
  deleteIcon: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "gray",
  },
  formText: {
    width: "100%",
    textAlign: "center",
    color: "gray",
  },
  deleteButton: {
    bgcolor: "#c81e1e",
    padding: "10px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    "&:hover": {
      bgcolor: "#c81e1e",
      opacity: "0.8",
    },
  },
};

const DeleteModal = ({
  deleteOpen,
  setDeleteOpen,
  formDetails,
  setFormlist,
}) => {
  const { id } = formDetails || {};

  const [deleteForm, setDeleteForm] = React.useState({});

  useEffect(() => {
    if (id) {
      setDeleteForm({
        id: id,
      });
    }
  }, [id]);

  const handleClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const handleSubmit = () => {
    if (!deleteForm.id) {
      console.error("Form ID is missing or null.");
      // Handle this case gracefully, e.g., show an error message to the user
      return;
    }

    // Send a DELETE request to the API with the user's ID
    apiClient
      .delete(`/delete-forms/${deleteForm.id}`)
      .then((res) => {
        console.log("delete response", res);

        // Remove the deleted form from the state
        setFormlist((prevFormlist) =>
          prevFormlist.filter((form) => form.id !== deleteForm.id)
        );

        // Handle success (e.g., show a success message or update the UI)
      })
      .catch((e) => {
        console.log("Error", e);
        // Handle error (e.g., show an error message)
      })
      .finally(() => {
        // Close the modal regardless of success or failure
        handleClose();
      });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={deleteOpen}
      >
        <DialogTitle sx={styles.dialogTitle} id="customized-dialog-title">
          Delete Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <DeleteOutlineRounded sx={styles.deleteIcon} />
            <span style={styles.formText}>
              Are you sure you want to delete this form?
            </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button autoFocus onClick={handleSubmit} sx={styles.deleteButton}>
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

DeleteModal.propTypes = {
  deleteOpen: PropTypes.bool.isRequired,
  setDeleteOpen: PropTypes.func.isRequired,
  formDetails: PropTypes.object.isRequired,
  setFormlist: PropTypes.func.isRequired,
};

export default DeleteModal;
