const express = require("express");
const cors = require("cors");
const putProduct = require("./Control/Put");
const deleteProduct = require("./Control/Delete");
const getProduct = require("./Control/Get");
const postProduct = require("./Control/Post");
const specialProduct = require("./Control/Special");

const port = 3500;
const app = express();
app.use(cors());
app.use(express.json());
// --------------------------------------------------

app.get("/products", getProduct);
app.get("/products/:id", specialProduct);
app.post("/products", postProduct);
app.put("/products/:id", putProduct);
app.delete("/products/:id", deleteProduct);

app.listen(port, (err) => {
  console.log("server work");
  if (err) {
    console.log(err);
  } else {
    console.log(`server run sucssecfuly on http://localhost:${port} `);
  }
});

// -------------------------------------------------------------
// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "./Objects.json");
// let Products = fs.readFileSync(filePath, "utf-8");
// Products = JSON.parse(Products);
// -------------------------------------------------------------
// app.get("/products", (req, res) => {
//   res.status(200).send(Products);
//   console.log(Products);
// });
// --------------------------------------------------
// important  that where we use (req and res) or (res and req)  Order is important
// app.post("/products", (req, res) => {
//   const schema = joi.object({
//     price: joi.number().required().max(100000).min(1),
//     title: joi.string().required(),
//     name: joi.string().required(),
//     count: joi.number().required().max(200).min(1),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }
//   let newProduct = {
//     id: Products.length === 0 ? 0 : Products[Products.length - 1].id + 1,
//     price: req.body.price,
//     title: req.body.title,
//     name: req.body.name,
//     count: req.body.count,
//   };
//   Products.push(newProduct);
//   fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));
//   res.status(201).json(Products);
// });
// ----------------------------------------------------------------------------------
// app.get("/products/:id", (req, res) => {
//   let selectedProduct = Products.find(
//     (item) => item.id === Number(req.params.id)
//   );
//   if (!selectedProduct) {
//     return res.status(404).send("product not found 404");
//   }
//   res.send(selectedProduct);
// });
// ----------------------------------------------------------------------------------
// app.put("/products/:id", (req, res) => {
//   const scheme = joi.object({
//     price: joi.number().required().max(100000).min(1),
//     title: joi.string().required().min(2),
//     name: joi.string().required().min(2),
//     count: joi.number().required().max(200).min(1),
//     id: joi.number(),
//   });
//   const { error } = scheme.validate(req.body, { abortEarly: false });
//   //  تمام خطا ها را به ما میده و صرفا اولین خطا را برنمیگردونه
//   console.log(req.params);
//   let productIndex = Products.findIndex(
//     (item) => item.id === Number(req.params.id)
//   );
//   if (error) {
//     return res.status(400).json({
//       message: "Invalid input",
//       details: error.details.map((err) => ({
//         field: err.context.key,
//         message: err.message,
//       })),
//     });
//   }
//   if (productIndex == -1) {
//     return res.status(404).send("product not found for edit");
//   }
//   Products[productIndex].name = req.body.name;
//   Products[productIndex].price = req.body.price;
//   Products[productIndex].title = req.body.title;
//   Products[productIndex].count = req.body.count;
//   fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));
//   res.send(Products[productIndex]);
// });
// ----------------------------------------------------------------------------------
// app.delete("/products/:id", (req, res) => {
//   let updataProdutcs = Products.filter(
//     (item) => item.id != Number(req.params.id)
//   );
//   if (updataProdutcs.length === Products.length) {
//     return res.send("product not exist");
//   }
//   Products = updataProdutcs;
//   fs.writeFileSync(filePath, JSON.stringify(Products, null, 2));

//   res.send("delete was succes");
// });
