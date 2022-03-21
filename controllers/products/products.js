const {
  getProductsDB,
  getProductDB,
} = require("../../models/products/products");
const getProducts = async (req, res) => {
  if (Object.keys(req.query).length === 1) {
    // there will always be a default limit set so length will be one without other queries.
    // let products = await getProducts('30')
    // return res.status(200).json(products);
  }

  //
  let products = await getProductsDB();

  // if req.query is not empty, return getAll products with queried results.
  // sift(req.query)
  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const productId = req.params.id;
  let product = await getProductDB(productId);
  console.log(product);
  return res.status(200).json(product);
};

module.exports = { getProducts, getProduct };
