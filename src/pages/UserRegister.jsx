import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function UserRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, username, password };
    console.log("Sending register body:", body);

    try {
      const res = await fetch("https://comp-3123-assignment1-seven.vercel.app/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }

      console.log("Register response:", data);
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          User Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Register
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Go to Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
