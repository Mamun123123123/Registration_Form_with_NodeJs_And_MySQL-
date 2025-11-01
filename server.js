const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",     
  database: "registrationDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) throw err;
    res.send("<h2>Registration Successful!</h2>");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "registration.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
