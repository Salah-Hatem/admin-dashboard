import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <Box width="100%" height="100%" display={isNonMobile ? "felx" : "block"}>
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="240px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box>
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default Layout;
