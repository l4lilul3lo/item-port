const { getAllProducts } = require("../../models/products/products");
const fetchAllProducts = async (req, res) => {
  let products = await getAllProducts();
  return res.status(200).json(products);
};

module.exports = { fetchAllProducts };
