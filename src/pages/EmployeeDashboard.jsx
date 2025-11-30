import React, { useState, useEffect } from "react";
import EmployeeView from "./EmployeeView";
import Button from '@mui/material/Button';
import { TextField, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function fetchAllEmployees() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/emp/employees", {
        method: "GET"
      });
      const data = await res.json();
      setEmployees(data);
      if (res.ok) {
        console.log("Fetched employees:", data);
      } else {
        console.error("Failed to fetch employees:", data);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  }

  async function deleteEmployee(empId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/emp/employees?eid=${empId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        console.log(`Deleted employee with ID: ${empId}`);
        fetchAllEmployees(); 
      } else {
        console.error("Failed to delete employee:", await res.json());
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  }

  async function fetchByDepartmentOrPosition(input) {
    try {
        const resDept = await fetch(`http://localhost:3000/api/v1/emp/employees/search/department/${input}`);
        const deptData = await resDept.json();

        // Fetch by position
        const resPos = await fetch(`http://localhost:3000/api/v1/emp/employees/search/position/${input}`);
        const posData = await resPos.json();

        setEmployees([...deptData, ...posData]);

      if (resDept.ok && resPos.ok) {
        console.log("Fetched employees by search:", [...deptData, ...posData]);
      } else {
        console.error("Failed to fetch employees by search:", [...deptData, ...posData]);
      }
    } catch (err) {
      console.error("Error fetching employees by search:", err);
    }
  }

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>Welcome to the employee dashboard!</p>

        <Box
        sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            mt: 2
        }}
        >
            <TextField
                label="Search Employees"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
            />
        <Button
                variant="contained"
                color="primary"
                onClick={() => fetchByDepartmentOrPosition(query)}
                sx={{ ml: 2, height: "56px" }}
            >
                Search
            </Button>
        </Box>

        <br />
        <br />
        <table
          border="2"
          style={{
            borderCollapse: "collapse",
            width: "80%",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "8px", width: "150px" }}>First Name</th>
            <th style={{ padding: "8px", width: "150px" }}>Last Name</th>
            <th style={{ padding: "8px", width: "150px" }}>Position</th>
            <th style={{ padding: "8px", width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td style={{ padding: "8px" }}>{emp.first_name}</td>
              <td style={{ padding: "8px" }}>{emp.last_name}</td>
              <td style={{ padding: "8px" }}>{emp.position}</td>
              <td style={{ padding: "8px" }}>
                <Button variant="contained" color="primary" onClick={() => navigate(`/employee/${emp._id}`)}>View</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteEmployee(emp._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => navigate(`/employee/edit/${emp._id}`)}
                  style={{ marginLeft: "5px" }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <button onClick={() => navigate("/employee/add")}>Add New Employee</button>
    </div>
  );
}
