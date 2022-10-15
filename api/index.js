const path = require('path');
const express = require("express");
const sqlite = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";
const bodyParser = require('body-parser');
const db = require("./database.js");

const PORT = process.env.PORT || 3001;

const app = express();

let sql;

/*
const db = new sqlite.Database(DBSOURCE, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err);
  } else {
    console.log('connected to SQLite server')
  }
});
*/

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/info", (req, res) => {
    res.json({ service: "Test API", version: "1.0.0" });
});

const EQUIPMENT_TYPES = [
    "Heavy/Construction Equipment", 
    "AG Equipment",
    "Vehicle",
    "Other"
];

/*
app.get("/api/equipment_types", (req, res) => {
    res.json(EQUIPMENT_TYPES);
});

app.get("/api/departments", (req, res) => {
    db.all("SELECT * from departments", [], function(err, rows) {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json(rows)
        }
    })
});
*/

app.post('/api/inbound_leads', (req, res) => {
  try{
    const {name, email, phone, address, state, city, zip_code, equipment_type, description, estimated_value} = req.body;
    sql = "INSERT INTO inbound_leads(name, email, phone, address, state, city, zip_code, equipment_type, description, estimated_value) VALUES (?,?,?,?,?,?,?,?,?,?)";
    db.run(sql, [name, email, phone, address, state, city, zip_code, equipment_type, description, estimated_value], (err) => {
      if(err) {
	console.log(err)
      }
      console.log("succesful input ", name, email, phone, address, state, city, zip_code, equipment_type, description, estimated_value);
    })
    return res.json({
      status: 200,
      success: true
    });
  } catch (error) {
    console.log(error)
    return res.json({
      status: 400,
      success: false
    });
  }
});

// This needs to be the last route defined so that it does not
// block the other defined routes since it is a wildcard match.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
