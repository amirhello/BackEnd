const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../Objects.json");
const joi = require("joi");
let Products = fs.readFileSync(filePath, "utf-8");
Products = JSON.parse(Products);
const postProduct = (req, res) => {
  const schema = joi.object({
    price: joi.number().required().max(100000).min(1),
    title: joi.string().required(),
    name: joi.string().required(),
    count: joi.number().required().max(200).min(1),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let newProduct = {
    id: Products.length === 0 ? 1 : Products[Products.length - 1].id + 1,
    price: req.body.price,
    title: req.body.title,
    name: req.body.name,
    count: req.body.count,
  };
  Products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));

  res.status(201).json(Products);
  console.log("product of ", newProduct.id, "was created");
};

module.exports = postProduct;
