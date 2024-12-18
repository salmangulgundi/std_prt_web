import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

export default function Upload() {
  const [uploadedData, setUploadedData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  // Handle file upload
  const handleUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedData((prevData) => [
        ...prevData,
        { name: file.name, type, size: `${(file.size / 1024).toFixed(2)} KB` },
      ]);
    }
  };

  const handleQuiz = () => {
    navigate("/addquiz")
  }

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Get the selected standard from localStorage
        const selectedStandard = localStorage.getItem("selectedStandard");

        if (!selectedStandard) {
          console.error("No standard selected");
          return;
        }

        const response = await axios.post(
          "http://localhost:8443/api/studentDetails",
          { selectedStandard }
        );

        console.log("Fetched Student Details:", response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, []);

  // React table setup for student data
  const data = React.useMemo(() => studentData, [studentData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "student_name", // Ensure this matches the database column
      },
      {
        Header: "Standard",
        accessor: "standard", // Ensure this matches the database column
      },
      {
        Header: "Email",
        accessor: "email", // Ensure this matches the database column
      },
      {
        Header: "Gender",
        accessor: "gender", // Ensure this matches the database column
      },
      {
        Header: "Phone Number",
        accessor: "phone_number", // Ensure this matches the database column
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Files and Videos</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Upload File:
        </label>
        <input
          type="file"
          accept="*"
          onChange={(e) => handleUpload(e, "File")}
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Upload Video:
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleUpload(e, "Video")}
          style={{ marginBottom: "10px" }}
        />
      </div>


      <div>
        <button onClick={handleQuiz}>Add Quiz</button>
      </div>


      <h3 style={{ marginTop: "30px" }}>Student Details</h3>
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ borderBottom: "2px solid #ddd" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#f4f4f4",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: "1px solid #ddd" }}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
