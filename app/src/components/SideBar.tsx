import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { DrawerRoute } from "../interfaces/drawer";

const DrawerLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

export const DrawerRoutes: DrawerRoute[] = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Contacts",
    path: "/contacts"
  }
]

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
          {DrawerRoutes.map((route: DrawerRoute, index: number) => (
            <DrawerLink to={route.path}>
              <ListItem key={route.path} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText>{route.label}</ListItemText>
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
