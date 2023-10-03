import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

const DrawerLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const SideBar = () => {
  const drawerWidth = 240;
  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Home", "Contacts"].map((text, index) => (
            <DrawerLink to={text.toLowerCase()}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            </DrawerLink>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default SideBar;
