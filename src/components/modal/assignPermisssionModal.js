import React from "react";
import {
  Modal,
  Typography,
  Select,
  MenuItem,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import apiClient from "../../Instances/client";

const AssignPermissionModal = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const [permissionList, setPermissionList] = React.useState([]);
  const [userEmailList, setUserEmailList] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [assignedPermissions, setAssignedPermissions] = React.useState([]);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const getAllUserEmails = async () => {
    try {
      const response = await apiClient.get("/get-user-email");
      setUserEmailList(response.data.useremail);
    } catch (error) {
      console.error("Error fetching user emails:", error);
    }
  };

  const getAllPermissionsAvailable = async () => {
    try {
      const response = await apiClient.get("/get-permissions");
      setPermissionList(response.data.permissionsName);
    } catch (error) {
      console.error("Error fetching permissions data:", error);
    }
  };

  const handleAssignPermissions = async () => {
    try {
      const response = await apiClient.post("/assign-permissions", {
        userEmail: selectedUser,
        permissions: assignedPermissions,
      });
      console.log("succes", response);
    } catch (error) {
      console.error("Error assigning permissions:", error);
    }
  };

  React.useEffect(() => {
    getAllPermissionsAvailable();
    getAllUserEmails();
  }, []);

  return (
    <Modal open={handleOpenModal} onClose={onClose}>
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
          Assign Permission
        </Typography>

        <Typography variant="h6" gutterBottom>
          User Email
        </Typography>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          fullWidth
          label="User Email"
          sx={{ color: "black" }}
        >
          {userEmailList?.map((email, index) => (
            <MenuItem value={email} key={index}>
              {email}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="h6" gutterBottom>
          Assigned Permissions
        </Typography>
        <Stack direction={"row"} spacing={1}>
          {assignedPermissions.map((permission, index) => (
            <Chip
              key={index}
              label={permission}
              onDelete={() =>
                setAssignedPermissions((prev) =>
                  prev.filter((p) => p !== permission)
                )
              }
              sx={{
                backgroundColor: "#0d2e4e",
                color: "white",
              }}
            />
          ))}
        </Stack>

        <Typography variant="h6" gutterBottom>
          Available Permissions
        </Typography>
        <Stack direction={"row"} spacing={1}>
          {permissionList.map((permission, index) => (
            <Chip
              key={index}
              label={permission}
              onClick={() =>
                setAssignedPermissions((prev) =>
                  prev.includes(permission)
                    ? prev.filter((p) => p !== permission)
                    : [...prev, permission]
                )
              }
              sx={{
                backgroundColor: assignedPermissions.includes(permission)
                  ? "#0d2e4e"
                  : "#ff4013",
                color: "white",
              }}
            />
          ))}
        </Stack>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAssignPermissions}
          sx={{ marginTop: "10px", backgroundColor: "#ff4013" }}
        >
          Assign Permissions
        </Button>
      </div>
    </Modal>
  );
};

export default AssignPermissionModal;
