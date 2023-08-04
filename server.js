require("dotenv").config();
const express = require("express");
const app = express();
const { connectDatabase, collection } = require("./config/database");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const port = process.env.PORT || 2121;
const viewPath = path.join(__dirname, "./views");

connectDatabase();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
    phone: req.body.phone,
    school: req.body.school,
  };
  await collection.collection.insertOne(data);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Check your Password");
    }
  } catch {
    res.send("Failed to Login kindly Check your Username or password");
  }
});

app.listen(port, () => {
  console.log(`The server is connected on port ${port}`);
});
