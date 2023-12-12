import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import CreateTicketModal from "../modal/createTicketModal";
import ViewTicketModal from "../modal/viewTicketModal";
import UpdateTicketModal from "../modal/updateTicketModal";
import apiClient from "../../Instances/client";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";

const TicketTable = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rows, setRows] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const createModalRef = useRef();
  const updateModalRef = useRef();
  const viewModalRef = useRef();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiClient.get("/get-all-tickets");
        const rowsWithId = response.data.map((row) => ({
          id: row._id,
          ...row,
        }));
        setRows(rowsWithId);
      } catch (error) {
        console.error("Error getting tickets:", error);
      }
    };

    fetchTickets();
  }, [selectedTicket]);

  const handleViewTicket = (row) => {
    setSelectedTicket(row);
    setViewModalOpen(true);
  };

  const handleCreateTicket = () => {
    if (createModalRef.current) {
      createModalRef.current.handleOpen();
    }
  };

  const handleUpdateTicket = (row) => {
    setSelectedTicket(row);
    setUpdateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    if (createModalRef.current) {
      createModalRef.current.handleClose();
    }
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  const columns = [
    {
      field: "ticketName",
      headerName: <b>Tickets</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => {}}>
          {params.value}
        </div>
      ),
    },
    {
      field: "status",
      headerName: <b>Ticket Status</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => {}}>
          {params.value}
        </div>
      ),
    },
    {
      field: "createdBy",
      headerName: <b>Ticket Owner</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => {}}>
          {params.value}
        </div>
      ),
    },
    {
      field: "escalationLevel",
      headerName: <b>Escalation level</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => {}}>
          {params.value}
        </div>
      ),
    },
    {
      headerName: <b>Actions</b>,
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" gap={2}>
          <Tooltip title="Update" arrow>
            <IconButton onClick={() => handleUpdateTicket(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" arrow>
            <IconButton onClick={() => handleViewTicket(params.row)}>
              <RemoveRedEyeOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ff4013",
          "&:hover": {
            backgroundColor: "#0d2e4e",
            color: "#fff",
          },
        }}
        onClick={handleCreateTicket}
      >
        Create Ticket
      </Button>

      <DataGrid rows={rows} columns={columns} style={{ marginTop: "5%" }} />

      {/* Render CreateTicketModal */}
      <CreateTicketModal
        ref={createModalRef}
        onClose={handleCloseCreateModal}
      />

      {/* Render UpdateTicketModal */}
      {isUpdateModalOpen && (
        <UpdateTicketModal
          onClose={handleCloseUpdateModal}
          ticketToUpdate={selectedTicket}
        />
      )}

      {/* Render ViewTicketModal */}
      {isViewModalOpen && selectedTicket && (
        <ViewTicketModal
          ref={viewModalRef}
          onClose={handleCloseViewModal}
          ticketToView={selectedTicket}
        />
      )}
    </div>
  );
};

export default TicketTable;
