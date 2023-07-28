import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, open, colDef } = props;
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef} open={open}>
      <GridColumnMenuFilterItem colDef={colDef} onClick={hideMenu} />
      <GridColumnMenuHideItem colDef={colDef} onClick={hideMenu} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
