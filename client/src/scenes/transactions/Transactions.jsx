import { useState } from "react";
import { useGetTransactionsQuery } from "../../state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  //Values to send to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page,
    pageSize,
  });
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    search,
    sort: JSON.stringify(sort), //so we can send it as query
  });

  console.log("data", data);
  console.log("search", search);

  const handlePageChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    const { page, pageSize } = newPaginationModel;
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationModel={paginationModel}
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          onPaginationModelChange={(newModel) => {
            handlePageChange(newModel);
          }}
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
        />
      </Box>
    </Box>
  );
};
export default Transactions;
