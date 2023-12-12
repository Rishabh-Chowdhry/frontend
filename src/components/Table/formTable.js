import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import apiClient from "../../Instances/client";
import EditFormModal from "../modal/editFormModal";
import ViewFormModal from "../modal/viewFormsModal";
import { IconButton, Stack } from "@mui/material";
import {
  Delete,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import DeleteModal from "../modal/deleteModal";

const FormTable = ({ onFormCreated }) => {
  const [formlist, setFormlist] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const columns = [
    {
      field: "title",
      headerName: <b>Form Title</b>,
      width: 200,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleFormClick(params.row)}
        >
          {params.value}
        </div>
      ),
    },
    {
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Stack direction={"row"} gap={2}>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleViewClick(params.row)}>
            <RemoveRedEyeOutlined />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)}>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const data = async () => {
    try {
      const res = await apiClient.get("/get-all-forms");
      const updatedForms = res.data.forms.map((form) => ({
        id: form._id,
        ...form,
      }));
      setFormlist(updatedForms);
      console.log("form Title:", updatedForms);
    } catch (error) {
      console.log(error, "Error in fetching form title");
    }
  };

  const handleFormClick = (selectedForm) => {
    setSelectedForm(selectedForm);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (selectedForm) => {
    setSelectedForm(selectedForm);
    setEditOpen(!editOpen);
  };

  const handleViewClick = (selectedForm) => {
    setSelectedForm(selectedForm);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (selectedForm) => {
    setSelectedForm(selectedForm);
    setDeleteOpen(!deleteOpen);
  };

  const closeModal = () => {
    setEditOpen(false);
    setIsViewModalOpen(false);
  };

  useEffect(() => {
    data();
  }, [onFormCreated]);

  return (
    <div style={{ marginTop: "12px" }}>
      <DataGrid
        rows={formlist}
        columns={columns}
        components={{}}
        onSelectionModelChange={(selection) => console.log(selection)}
      />

      <EditFormModal
        setEditOpen={setEditOpen}
        formDetails={selectedForm}
        editOpen={editOpen}
      />

      {isViewModalOpen && (
        <ViewFormModal
          viewOpen={isViewModalOpen}
          setViewOpen={setIsViewModalOpen}
          formDetails={selectedForm}
        />
      )}

      <DeleteModal
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        formDetails={selectedForm}
        setFormlist={setFormlist} // Pass the setFormlist function
      />
    </div>
  );
};

export default FormTable;
