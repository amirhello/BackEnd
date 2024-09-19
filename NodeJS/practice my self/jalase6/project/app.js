// const path = require("path");
// console.log(path);
// console.log(path.join(__dirname  ,"amir/text"))
// ----------------------------------------------------

// const os = require("os");
// // console.log(os.cpus());
// console.log(os.freemem() / 1000000, "Mb");
// console.log(os.totalmem());
// کار های مربوط به سیستم را انجام میده مثل رم و محل فایل ها و حذف فایل و مسیر ها
// ----------------------------------------------------
// const fs = require("fs");
// const sampleText = fs.readFileSync("sample.txt", "utf-8");
// console.log(sampleText);
// اون فایلی که وجود داره را میخونه برامون و مقدارش را میریزه توی متغیر
// ----------------------------------------------------

// const EvenEmmiter = require("events");
// const emmiter = new EvenEmmiter();
// emmiter.on("printHello", (item) => {
//   console.log("hello", item);
// });
// emmiter.emit("printHello", " , Hi");
// ----------------------------------------------------

const http = require("http");
const server = http.createServer((request, respons) => {
  respons.write("hello world ");
  respons.end();
});

server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
