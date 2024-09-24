const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../Objects.json");
let Products = fs.readFileSync(filePath, "utf-8");
Products = JSON.parse(Products);
const specialProduct = (req, res) => {
  let selectedProduct = Products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!selectedProduct) {
    return res.status(404).send("product not found 404");
  }
  res.send(selectedProduct);
};

module.exports = specialProduct;
