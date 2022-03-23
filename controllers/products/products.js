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

  console.log(products);
  let newObj = products.map((x) => {
    return {
      id: x.id,
      info: {
        title: x.title,
        price: x.price,
        category: x.category,
        description: x.description,
        image: x.image,
      },
    };
  });
  console.log(newObj);
  return res.status(200).json(newObj);
};

const getProduct = async (req, res) => {
  const productId = req.params.id;
  let product = await getProductDB(productId);
  let newObj = {
    id: product.id,
    info: {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    },
  };

  return res.status(200).json(newObj);
};

module.exports = { getProducts, getProduct };
