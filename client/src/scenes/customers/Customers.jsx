import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../state/api";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box>
        <DataGrid></DataGrid>
      </Box>
    </Box>
  );
};
export default Customers;
