const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "./Objects.json");
const joi = require("joi");
const cors = require("cors");
let Products = fs.readFileSync(filePath, "utf-8");

// console.log(typeof Products);
Products = JSON.parse(Products);
// console.log(typeof Products);

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
// درسخواست ما را تبدیل به یک داده جیسون میکنه

const port = 3500;
// important  that where we use (req and res) or (res and req)  Order is important
app.get("/products", (req, res) => {
  res.status(200).send(Products);
});

app.post("/products", (req, res) => {
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
    id: Products[Products.length - 1].id + 1,
    price: req.body.price,
    title: req.body.title,
    name: req.body.name,
    count: req.body.count,
  };
  Products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));

  res.status(201).json(Products);
});

app.get("/products/:id", (req, res) => {
  let selectedProduct = Products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!selectedProduct) {
    return res.status(404).send("product not found 404");
  }
  res.send(selectedProduct);
});
app.put("/products/:id", (req, res) => {
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
});
app.delete("/products/:id", (req, res) => {
  let updataProdutcs = Products.filter(
    (item) => item.id != Number(req.params.id)
  );
  if (updataProdutcs.length === Products.length) {
    return res.send("product not exist");
  }
  Products = updataProdutcs;
  fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));

  res.send("delete was succes");
});
app.listen(port, (err) => {
  console.log("server work");
  if (err) {
    console.log(err);
  } else {
    console.log(`server run sucssecfuly on http://localhost:${port} `);
  }
});
