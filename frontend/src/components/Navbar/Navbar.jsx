import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6" sx={{ textDecoration: "none", color: "inherit" }} component={Link} to="/">
          Модерация объявлений
        </Typography>
        <Button color="inherit" component={Link} to="/stats">Статистика</Button>
      </Toolbar>
    </AppBar>
  );
}
