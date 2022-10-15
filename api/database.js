var sqlite = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";
const CREATE_LEADS = `
    CREATE TABLE inbound_leads (
        id INTEGER PRIMARY KEY,
        name TEXT, 
        email TEXT,
        phone TEXT,
        address TEXT,
        state TEXT,
        city TEXT,
        zip_code TEXT,
        equipment_type TEXT,
        description TEXT,
        estimated_value INTEGER
    )
`;
const CREATE_DEPARTMENTS = `
    CREATE TABLE departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        email TEXT
    );
`;
const db = new sqlite.Database(DBSOURCE, (err) => {
  if (err) {
    return console.error(err);
    throw err;
  } else {
    console.log('Conectado a la base de datos SQLite');
    start();
  }
});

function start(){
  db.run(CREATE_LEADS,
    (err) => {
      if (err) {
	console.log(`Using previously created leads table (in ${DBSOURCE})`)
      } else {
	db.run(CREATE_DEPARTMENTS,
	  (err) => {
	    if(err) {
	      console.error(err)
	    } else {
	      var insert = 'INSERT INTO departments (name, email) VALUES (?,?)'
	      db.run(insert, ["Customer Service","support@example.com"])
	      db.run(insert, ["Sales","sales@example.com"])
	      db.run(insert, ["Listing Operations","listing@example.com"])
	      db.run(insert, ["Tech Support","tech@example.com"])
	    }
	})
      }
    } 
  );
}

module.exports = db
