import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Modal,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { Create as CreateIcon } from "@mui/icons-material";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [PermissionModal, setPermissionModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [permissonName, setPermissionName] = useState("");
  const [description, setDescriotion] = useState("");
  const [Category, setCategory] = useState("");
  const [value, setValue] = React.useState("");
  const handleCreatePermission = () => {
    // Logic for creating a role
    // This function will be implemented based on your specific requirements

    // Close the modal after role creation
    setPermissionModal(false);
  };
  const handleCreateRole = () => {
    // Logic for creating a role
    // This function will be implemented based on your specific requirements
    console.log("Role created:", roleName, roleValue);

    // Close the modal after role creation
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePermissonModal = () => {
    setPermissionModal(true);
  };

  const handlePermissionCloseModal = () => {
    setPermissionModal(false);
  };
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton>
                <CreateIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">User Management</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ mt: 5 }}>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Create Role
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handlePermissonModal}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Create Permissions
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleCreateRole}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Assign Permissions
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleCreateRole}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                View Roles
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleCreateRole}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                View Permissions
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleCreateRole}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Edit
              </Button>
            </Grid>
            {/* Other buttons */}
          </Grid>
        </CardContent>
      </Card>

      {/* Role Creation Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Role
          </Typography>
          <TextField
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role Value (ID)"
            value={roleValue}
            onChange={(e) => setRoleValue(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleCreateRole}>
            Create
          </Button>
        </div>
      </Modal>

      {/* Permissions Creation Modal */}
      <Modal open={PermissionModal} onClose={handlePermissionCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Permissions
          </Typography>
          <TextField
            label="Name"
            value={permissonName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setRoleValue(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={Category}
            onChange={(e) => setRoleValue(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="h6" gutterBottom>
            Is Active
          </Typography>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="best" control={<Radio />} label="True" />
            <FormControlLabel value="worst" control={<Radio />} label="False" />
          </RadioGroup>
          <Button variant="contained" onClick={handleCreateRole}>
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserManagement;
