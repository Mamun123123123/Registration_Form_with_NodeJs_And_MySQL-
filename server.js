const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // যদি password থাকে তবে লিখবে
  database: "registrationDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// POST Route
app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) throw err;
    res.send("<h2>Registration Successful!</h2>");
  });
});

// Serve registration.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "registration.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
