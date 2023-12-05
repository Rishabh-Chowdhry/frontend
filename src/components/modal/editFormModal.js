import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import apiClient from "../../Instances/client";
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const renderTextField = (index, label, value, onChange) => (
  <TextField
    key={index}
    id={`field-${index}`}
    name={`field-${index}`}
    sx={{ marginBottom: "10px" }}
    onChange={onChange}
    value={value}
    label={label}
    variant="outlined"
    fullWidth
  />
);

const EditFormModal = ({ editOpen, setEditOpen, formDetails }) => {
  const { _id, title, fields, createdBy } = formDetails || {};

  const [editForm, setEditForm] = useState({
    formId: _id,
    title: "",
    fields: [],
    createdBy: createdBy,
  });

  useEffect(() => {
    if (formDetails && formDetails.fields) {
      setEditForm((prevForm) => ({
        ...prevForm,
        formId: formDetails._id,
        title: formDetails.title,
        fields: formDetails.fields.map((field) => ({
          ...field,
          isAppendable: field.isAppendable,
          isEditing: field.isEditing,
          isDisabled: field.isDisabled,
        })),
        createdBy: formDetails.createdBy,
      }));
    }
  }, [formDetails, editOpen]);

  const handleUpdate = useCallback(() => {
    const sanitizedForm = {
      ...editForm,
      fields: editForm.fields.map((field) => ({
        ...field,
        isAppendable: field.isAppendable || false,
        isEditing: field.isEditing || false,
        isDisabled: field.isDisabled || false,
      })),
    };

    console.log("Sanitized Form:", sanitizedForm);

    apiClient
      .put(`/edit-forms/${sanitizedForm.formId}`, sanitizedForm)
      .then((res) => {
        console.log("Update Successful", res.data);
        setEditOpen(false);
      })
      .catch((error) => {
        console.error("Error updating form", error);
        // Handle the error appropriately
      });
  }, [editForm, setEditOpen]);

  const handleClose = useCallback(() => setEditOpen(false), [setEditOpen]);
  const handleClickOpen = useCallback(() => setEditOpen(true), [setEditOpen]);

  const handleCheckboxChange = useCallback(
    (fieldIndex, checkboxName, isChecked) => {
      setEditForm((prevForm) => {
        const updatedFields = [...prevForm.fields];
        updatedFields[fieldIndex] = {
          ...updatedFields[fieldIndex],
          [checkboxName]: isChecked,
        };
        return { ...prevForm, fields: updatedFields };
      });
    },
    []
  );

  const handleAddField = useCallback(() => {
    setEditForm((prevForm) => ({
      ...prevForm,
      fields: [
        ...prevForm.fields,
        {
          label: "",
          type: "text",
          isAppendable: false,
          isEditing: false,
          isDisabled: false,
        },
      ],
    }));
  }, []);

  const handleRemoveField = useCallback((indexToRemove) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      fields: prevForm.fields.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
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
          {renderTextField("title", "Form Title", editForm.title, (e) => {
            setEditForm((prevForm) => ({ ...prevForm, title: e.target.value }));
          })}

          {editForm.fields.map((field, index) => (
            <div key={index}>
              {renderTextField(
                `field-${index}`,
                `Field ${index + 1} Label`,
                field.label,
                (e) => {
                  setEditForm((prevForm) => {
                    const updatedFields = [...prevForm.fields];
                    updatedFields[index] = {
                      ...updatedFields[index],
                      label: e.target.value,
                    };
                    return { ...prevForm, fields: updatedFields };
                  });
                }
              )}

              {["isAppendable", "isEditing", "isDisabled"].map(
                (checkboxName) => (
                  <FormControlLabel
                    key={checkboxName}
                    control={
                      <Checkbox
                        checked={field[checkboxName]}
                        onChange={(e) =>
                          handleCheckboxChange(
                            index,
                            checkboxName,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={
                      checkboxName === "isAppendable"
                        ? "Appendable"
                        : checkboxName === "isEditing"
                        ? "Editable"
                        : "Disabled"
                    }
                  />
                )
              )}

              <Button
                onClick={() => handleRemoveField(index)}
                variant="outlined"
                sx={{
                  bgcolor: (theme) => theme.palette.error.main,
                  color: "white",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.error.dark,
                  },
                }}
              >
                <RemoveCircleOutlineOutlined />
              </Button>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddField}
            variant="outlined"
            sx={{
              bgcolor: (theme) => theme.palette.error.main,
              color: "white",
              "&:hover": {
                bgcolor: (theme) => theme.palette.error.dark,
              },
            }}
          >
            Add Field
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleUpdate();
            }}
            sx={{
              bgcolor: (theme) => theme.palette.error.main,
              color: "white",
              "&:hover": {
                bgcolor: (theme) => theme.palette.error.dark,
              },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default EditFormModal;
