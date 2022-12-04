import React from "react";
import { Typography } from "@material-ui/core";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@material-ui/icons";

interface HeaderProps {
  header: String;
}

const headingStyle = {
  fontSize: "2em",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  height: "70px",
};

const Header = ({ header: text }: HeaderProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" style={headerStyle}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h1" color="inherit" component="div" style={headingStyle}>
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
