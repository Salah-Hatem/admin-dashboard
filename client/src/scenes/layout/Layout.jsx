import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api";
import { useSelector } from "react-redux";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); //get the user id from the redux slice
  const { data } = useGetUserQuery(userId); //making an api call

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="240px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <NavBar
          isNonMobile={isNonMobile}
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
