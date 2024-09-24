const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../Objects.json");
const joi = require("joi");
let Products = fs.readFileSync(filePath, "utf-8");
Products = JSON.parse(Products);
const putProduct = (req, res) => {
  const scheme = joi.object({
    price: joi.number().required().max(100000).min(1),
    title: joi.string().required().min(2),
    name: joi.string().required().min(2),
    count: joi.number().required().max(200).min(1),
    id: joi.number(),
  });
  const { error } = scheme.validate(req.body, { abortEarly: false });
  //  تمام خطا ها را به ما میده و صرفا اولین خطا را برنمیگردونه

  console.log(req.params);
  let productIndex = Products.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (error) {
    return res.status(400).json({
      message: "Invalid input",
      details: error.details.map((err) => ({
        field: err.context.key,
        message: err.message,
      })),
    });
  }

  if (productIndex == -1) {
    return res.status(404).send("product not found for edit");
  }
  Products[productIndex].name = req.body.name;
  Products[productIndex].price = req.body.price;
  Products[productIndex].title = req.body.title;
  Products[productIndex].count = req.body.count;
  fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));
  res.send(Products[productIndex]);
};

module.exports = putProduct;
