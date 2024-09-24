const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../Objects.json");
let Products = fs.readFileSync(filePath, "utf-8");
Products = JSON.parse(Products);

const deleteProduct = (req, res) => {
  let updataProdutcs = Products.filter(
    (item) => item.id != Number(req.params.id)
  );
  if (updataProdutcs.length === Products.length) {
    return res.status(404).send("product not exist");
  }
  Products = updataProdutcs;
  fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));

  res.send("delete was succes");
};

module.exports = deleteProduct;
