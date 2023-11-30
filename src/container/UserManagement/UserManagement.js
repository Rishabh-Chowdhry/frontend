import { Create as CreateIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiClient from "../../Instances/client";
import { AssignPermissionModal, Table } from "../../components";
const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [PermissionModal, setPermissionModal] = useState(false);
  const [roleName, setRoleName] = useState("");

  const [permissonName, setPermissionName] = useState("");
  const [description, setDescriotion] = useState("");
  const [Category, setCategory] = useState("");
  const [permissionlist, setpermissionlist] = useState();
  const [Rolelist, setRolelist] = useState();
  const [value, setValue] = React.useState("");
  const [ViewPermissionModal, setViewPermissionModal] = useState(false);
  const [ViewRoleModal, setViewRoleModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [userlist, setuserlist] = useState([]);
  const handleOpenAssignPermissonModal = () => {
    console.log("open");
    setAssignPermissionModal(!assignPermissionModal);
  };

  const handleOpenViewRoleModal = () => {
    setViewRoleModal(true);
  };
  const handleCloseViewRoleModal = () => {
    setViewRoleModal(false);
  };
  const handleOpenViewPermissionModal = () => {
    setViewPermissionModal(true);
  };
  const handleCloseViewPermissionModal = () => {
    setViewPermissionModal(false);
  };
  const handleViewRoleData = async () => {
    try {
      console.log("Fetching roles data...");
      const response = await apiClient.get("/get-roles");
      console.log("API response:", response);

      setRolelist(response.data.roleNames);
      console.log("Role list:", Rolelist);
    } catch (error) {
      console.error("Error fetching permissions data:", error);
    }
  };
  const handleViewPermmisonData = async () => {
    try {
      console.log("Fetching permissions data...");
      const response = await apiClient.get("/get-permissions");
      console.log("API response:", response);

      setpermissionlist(response.data.permissionsName);
      console.log("Permission list:", permissionlist);
    } catch (error) {
      console.error("Error fetching permissions data:", error);
    }
  };

  useEffect(() => {
    console.log("List", Rolelist);
    // Fetch data when the component mounts
    handleViewRoleData();
  }, []); // Empty dependency array ensures the effect runs only once
  useEffect(() => {
    console.log("List", permissionlist);
    // Fetch data when the component mounts
    handleViewPermmisonData();
  }, []); // Empty dependency array ensures the effect runs only once
  const handleCreateRole = async () => {
    try {
      const requestData = {
        roleName: roleName,

        // Add other data as needed
      };
      console.log("checkk", requestData);
      const response = await apiClient.post("/create-roles", requestData);
      console.log(response.data, "Role created successfully");

      // Reset form fields and close the modal after role creation
      setRoleName("");
      handleViewRoleData();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating Role:", error.message);
    }
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

  const handleCreatePermissionModal = async () => {
    try {
      const permissionData = {
        name: permissonName,
        description: description,
        category: Category,
        isActive: true,
      };

      const res = await apiClient.post("/create-permissions", permissionData);

      // Handle the response as needed
      console.log("Permission created successfully:", res.data);

      // You might want to do something else with the response, depending on your application
      handleViewPermmisonData();
    } catch (error) {
      console.error("Error creating permission:", error);

      // Handle the error appropriately
      // For example, show an error message to the user or perform additional actions
    }
  };
  const handleUserModal = () => {
    setUserModal(true);
  };
  const handleCloseUserModal = () => {
    setUserModal(false);
  };
  const createUser = async () => {
    try {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phonenumber: phonenumber,
        role: role.toString(),
        companyname: companyname,
      };

      const response = await apiClient.post("/signup", data);

      if (response.status === 201) {
        setUserModal(false);
        setRoleName("");
        handleViewRoleData();
        setEmail("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setPhonenumber("");
        setcompanyname("");
      }
    } catch (e) {
      console.log("error in creating user", e);
    }
  };
  const handleViewUserData = async () => {
    try {
      console.log("Fetching user data...");
      const response = await apiClient.get("/get-all-user");
      console.log("API response:", response);

      setuserlist(response.data.data);
      console.log("User list:", userlist);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
                onClick={handleOpenAssignPermissonModal}
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
                onClick={handleOpenViewRoleModal}
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
                onClick={handleOpenViewPermissionModal}
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
                onClick={handleUserModal}
                sx={{
                  backgroundColor: "#ff4013",
                  "&:hover": {
                    backgroundColor: "#0d2e4e",
                    color: "#fff",
                  },
                }}
              >
                Create User
              </Button>
            </Grid>
            {/* <Grid item>
              <Button
                variant="contained"
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
            </Grid> */}
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
            onChange={(e) => setPermissionName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescriotion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
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
          <Button variant="contained" onClick={handleCreatePermissionModal}>
            Create
          </Button>
        </div>
      </Modal>
      {/* Permissions View Modal */}
      <Modal
        open={ViewPermissionModal}
        onClose={handleCloseViewPermissionModal}
      >
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
            View Permissions
          </Typography>

          {permissionlist && (
            <Stack direction={"row"} spacing={1}>
              {permissionlist.map((permission, index) => (
                <Chip
                  key={index}
                  label={permission}
                  sx={{
                    backgroundColor: "#ff4013",
                    color: "white",
                  }}
                >
                  {permission}
                </Chip>
              ))}
            </Stack>
          )}
        </div>
      </Modal>
      {/* Role View Modal */}
      <Modal open={ViewRoleModal} onClose={handleCloseViewRoleModal}>
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
            View Role
          </Typography>

          {Rolelist && (
            <Stack direction={"row"} spacing={1}>
              {Rolelist.map((role, index) => (
                <Chip
                  key={index}
                  label={role}
                  sx={{
                    backgroundColor: "#ff4013",
                    color: "white",
                  }}
                >
                  {role}
                </Chip>
              ))}
            </Stack>
          )}
        </div>
      </Modal>
      {/* User Modal */}
      <Modal open={userModal} onClose={handleCloseUserModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create User
          </Typography>
          <TextField
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            type="email"
            margin="normal"
          />
          <TextField
            label="PhoneNumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            type="Password"
          />
          <TextField
            label="Company"
            value={companyname}
            onChange={(e) => setcompanyname(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            label="Roles"
            sx={{ color: "black" }}
          >
            {Rolelist?.map((role, index) => (
              <MenuItem value={role} key={index}>
                {role}
              </MenuItem>
            ))}
          </Select>

          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff4013",
                "&:hover": {
                  backgroundColor: "#0d2e4e",
                  color: "#fff",
                },
                mt: 2,
              }}
              onClick={() => createUser()}
            >
              Create
            </Button>
          </Grid>
        </div>
      </Modal>
      {assignPermissionModal && (
        <AssignPermissionModal
          onClose={() => {
            setAssignPermissionModal(!assignPermissionModal);
          }}
        />
      )}
      <Table onUserCreated={handleViewUserData} />
    </>
  );
};

export default UserManagement;
