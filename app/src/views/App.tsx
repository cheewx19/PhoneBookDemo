import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ContactList from "./ContactList";
import SideBar from "../components/SideBar";
import Home from "./Home";

const App = () => {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Phone Book Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/contacts" element={<ContactList />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
export default App;
