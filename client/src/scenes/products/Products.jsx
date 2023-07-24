import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../state/api";
import Product from "./Product";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem ">
      <Header title={"Products"} subtitle={"See your list of products"} />
      {data || !isLoading ? (
        <Box
          mt="16px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="16px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => {
              return (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat[0]}
                />
              );
            }
          )}
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
export default Products;
