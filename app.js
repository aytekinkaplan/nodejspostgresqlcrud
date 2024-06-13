const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");
const queries = require("./db/queries");

const app = express();
const port = 3000;

// PostgreSQL bağlantı havuzu
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

// EJS template motorunu ayarla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Statik dosya servisi
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Ana sayfa
app.get("/", async (req, res) => {
  try {
    const results = await queries.getAllUsers(pool);
    res.render("index", { users: results.rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcı ekleme formu
app.get("/add", (req, res) => {
  res.render("add");
});

// Kullanıcı ekle
app.post("/add", async (req, res) => {
  try {
    await queries.addUser(pool, req.body);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcı düzenleme formu
app.get("/edit/:id", async (req, res) => {
  try {
    const result = await queries.getUserById(pool, req.params.id);
    res.render("edit", { user: result.rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcı güncelle
app.post("/edit/:id", async (req, res) => {
  try {
    await queries.updateUser(pool, req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcı sil
app.post("/delete/:id", async (req, res) => {
  try {
    await queries.deleteUser(pool, req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
