import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import HomeIcon from "@mui/icons-material/Home";

type Anchor = string;

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState("/"); // Anchor represents which page we are currently at.
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const list = (anchor: Anchor) => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} bgcolor="extraLight">
      <nav>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/scheduling")}>
            <MemoryIcon />
            <ListItemText primary={"Protsessihaldus"} />
          </ListItemButton>
        </ListItem>
      </nav>
      <Divider />
      <List>
        {["About"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Drawer PaperProps={{ sx: { backgroundColor: "extraLight" } }} anchor={"left"} open={open} onClose={toggleDrawer(false)}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
