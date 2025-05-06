import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => (
  <Container sx={{ textAlign:"center", mt:8 }}>
    <Typography variant="h4" gutterBottom>
      Welcome to the AI-Powered Presentation Feedback System
    </Typography>
    <Typography sx={{ mb:4 }}>
      Get instant clarity, grammar & structure feedback on your slides’ text.
    </Typography>
    <Box sx={{ display:"flex", justifyContent:"center", gap:2 }}>
      <Button component={Link} to="/signup" variant="contained">Try Free</Button>
      <Button component={Link} to="/login"  variant="outlined">Login</Button>
    </Box>
  </Container>
);

export default Home;
