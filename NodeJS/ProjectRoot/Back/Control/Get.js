const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../Objects.json");

const getProduct = (req, res) => {
  let Products = fs.readFileSync(filePath, "utf-8");
  Products = JSON.parse(Products);

  res.status(200).send(Products);
};

module.exports = getProduct;

// {
//   let selectedProduct = Products.find(
//     (item) => item.id === Number(req.params.id)
//   );

//   if (!selectedProduct) {
//     return res.status(404).send("product not found 404");
//   }
//   res.send(selectedProduct);
// };
