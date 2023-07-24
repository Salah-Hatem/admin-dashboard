import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", ProductSchema);

export default Products;
