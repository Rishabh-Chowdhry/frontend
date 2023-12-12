import React, { useState, useEffect } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { DownloadTwoTone } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import apiClient from "../../Instances/client"; // Assuming you have an Axios instance

const ReportTable = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const columns = [
    {
      field: "fileName",
      headerName: <b>File Name</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => {}}>
          {params.value}
        </div>
      ),
    },
    {
      field: "date",
      headerName: <b>Generated Date</b>,
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
          <Tooltip title="Download Report" arrow>
            <IconButton onClick={() => handleDownloadReport(params.row)}>
              <DownloadTwoTone />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleDownloadReport = async (selectedRow) => {
    try {
      if (!selectedRow) {
        console.error("No row selected for download");
        return;
      }

      // Make a request to the backend to download the report
      const response = await apiClient.get(
        `/download-report/${selectedRow.id}`,
        {
          responseType: "blob",
        }
      );

      // Create a temporary link element
      const link = document.createElement("a");

      // Create a URL for the blob and assign it to the link's href
      link.href = window.URL.createObjectURL(new Blob([response.data]));

      // Set the download attribute to specify the file name
      link.download = selectedRow.fileName; // You can adjust this based on your file naming logic

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating download:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get("/get-all-reports");
      // Add unique IDs to each row
      const dataWithIds = response.data.map((row, index) => ({
        ...row,
        id: index,
      }));
      setReportData(dataWithIds);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={reportData}
        onSelectionModelChange={(newSelection) => {
          setSelectedRowIds(newSelection.selectionModel);
        }}
      />
    </div>
  );
};

export default ReportTable;
