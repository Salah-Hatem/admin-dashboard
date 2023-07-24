import Products from "../models/Products.js";
import ProductStats from "../models/ProductStats.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStats.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
