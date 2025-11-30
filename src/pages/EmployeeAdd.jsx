import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function EmployeeAdd() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://comp-3123-assignment1-seven.vercel.app/api/v1/emp/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      });

      const data = await res.json();
      alert("Employee added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Employee
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            label="Position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            label="Salary"
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            label="Department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Employee
          </Button>
        </form>
      </Box>
    </Container>
  );
}
