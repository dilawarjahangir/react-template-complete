import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box,
} from "@mui/material";
import AuthService from "../../../services/AuthService";
import toast from "../../../services/ToastService";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [form, setForm] = useState({ email:"", password:"" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await AuthService.login(form.email, form.password);
    if (res.success) {
      toast.success("Welcome back!");
      navigate("/");
    } else toast.error(res.message ?? "Login failed");
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h5" align="center">Sign In</Typography>
        <TextField name="email"    label="Email"    required fullWidth onChange={handleChange}/>
        <TextField name="password" label="Password" type="password" required fullWidth onChange={handleChange}/>
        <Button type="submit" variant="contained" fullWidth>Login</Button>
        <Button component={Link} to="/signup" size="small">Need an account? Sign Up</Button>
      </Box>
    </Container>
  );
};

export default SignIn;
