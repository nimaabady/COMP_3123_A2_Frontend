import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EmployeeView() {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`https://comp-3123-assignment1-seven.vercel.app/api/v1/emp/employees/${id}`, {
          method: "GET"
        });
        const data = await res.json();
        setEmployee(data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading</p>;

  return (
    <div>
      <h1>Employee Details</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "30px",
          border: "5px solid #000000"
        }}
      >
        <h2 style={{ color: "#000000" }}>
          Name: {employee.first_name} {employee.last_name}
        </h2>
        <h3 style={{ color: "#000000" }}>Employee ID: {employee._id}</h3>
        <h3 style={{ color: "#000000" }}>Salary: {employee.salary}</h3>
        <h3 style={{ color: "#000000" }}>Position: {employee.position}</h3>
        <h3 style={{ color: "#000000" }}>Department: {employee.department}</h3>
        <h3 style={{ color: "#000000" }}>Email: {employee.email}</h3>
      </div>
      <br />
        <button onClick={() => window.history.back()}>Back to Dashboard</button>
    </div>
  );
}
