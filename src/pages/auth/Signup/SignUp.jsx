import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box,
} from "@mui/material";
import apiService from "../../../services/apiService";
import toast from "../../../services/ToastService";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiService().post("/api/signup", form);
      if (data.success) {
        toast.success("Account created!", "Please sign in.");
        navigate("/login");
      }
    } catch {
      toast.error("Signup failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h5" align="center">Sign Up</Typography>
        <TextField name="name"     label="Name"     required fullWidth onChange={handleChange}/>
        <TextField name="email"    label="Email"    required fullWidth onChange={handleChange}/>
        <TextField name="password" label="Password" type="password" required fullWidth onChange={handleChange}/>
        <Button type="submit" variant="contained" fullWidth>Register</Button>
        <Button component={Link} to="/login" size="small">Already have an account? Login</Button>
      </Box>
    </Container>
  );
};

export default SignUp;
