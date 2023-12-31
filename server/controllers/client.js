import Products from "../models/Products.js";
import ProductStats from "../models/ProductStats.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryISO3 from "country-iso-2-to-3";

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

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const generateSort = (sort) => {
      const sortObj = JSON.parse(sort);
      const formattedSort = {
        [sortObj.field]: sortObj.sort == "asc" ? 1 : -1,
      };
      return formattedSort;
    };
    const formattedSort = generateSort(sort);
    const transactions = await Transaction.find({
      $or: [
        // { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(formattedSort)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.find({}).countDocuments();

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getTransactions = async (req, res) => {
//   try {
//     // sort should look like this: { "field": "userId", "sort": "desc"}
//     const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

//     // formatted sort should look like { userId: -1 }
//     const generateSort = () => {
//       const sortParsed = JSON.parse(sort);
//       const sortFormatted = {
//         [sortParsed.field]: sortParsed.sort == "asc" ? 1 : -1,
//       };

//       return sortFormatted;
//     };
//     const sortFormatted = Boolean(sort) ? generateSort() : {};

//     const transactions = await Transaction.find({
//       $or: [
//         // { cost: { $regex: new RegExp(search, "i") } },
//         { userId: { $regex: new RegExp(search, "i") } },
//       ],
//     })
//       .sort(sortFormatted)
//       .skip(page * pageSize)
//       .limit(pageSize);

//     const total = await Transaction.find({}).countDocuments();

//     res.status(200).json({
//       transactions,
//       total,
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};