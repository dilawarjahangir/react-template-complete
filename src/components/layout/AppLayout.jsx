import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "./NavLinks";
import AuthService from "../../services/AuthService";

const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Text-Feedback App
          </Typography>

          {navLinks.map(({ label, path }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              variant={pathname === path ? "contained" : "text"}
              size="small"
            >
              {label}
            </Button>
          ))}
          <Button onClick={handleLogout} size="small" color="error">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* content */}
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
