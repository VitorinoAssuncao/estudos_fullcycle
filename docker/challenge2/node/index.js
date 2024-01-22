const express = require("express")
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: "nodedb"
};

const connection = mysql.createConnection(config)

connection.query(`INSERT INTO people(name) values ('Picolino');`)


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get('/', (req, res) => {
    const query = 'SELECT name FROM people';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const names = results.map((result) => result.name);
      res.render('index', { names });
    });
  });
  

app.listen(port, () => {
    console.log('Running in port '+port)
})