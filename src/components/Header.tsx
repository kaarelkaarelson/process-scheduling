import React from "react";
import { Typography } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import Drawer from "./Drawer";
import styles from "./Header.module.scss"

interface HeaderProps {
  header: String;
}


const Header = ({ header: text }: HeaderProps) => {
  return (
    <AppBar position="fixed" color="primary" sx={{bgcolor: 'primary.main'}}>
      <Toolbar variant="regular" >
        <Drawer/>
        <Typography variant="caption" component="div" sx={{fontSize: '2em'}} className={styles.headingStyle}>
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
