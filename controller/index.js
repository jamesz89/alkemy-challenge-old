const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kainner#777",
  database: "budget_manager"
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connection to DB established");
});

//Routes
app.get('/', (req, res) => {
  res.send("Budget Manager App - Alkemy FullStack Challenge");
});

app.get('/transactions', (req, res) => {
  connection.query("SELECT * FROM `transactions`", (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.post('/transactions', bodyParser.json(), (req, res) => {
  const transaction = {
    concept: req.body.concept,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type,
    categoryId: req.body.categoryId
  };

  connection.query(`
  INSERT INTO transactions (concept, amount, date, type, categoryId) 
  VALUES (
    "${transaction.concept}", 
    ${transaction.amount}, 
    "${transaction.date}", 
    "${transaction.type}", 
    ${transaction.categoryId})`,
    (error, results) => {
      if (error) throw error;
      console.log(results);
      res.json(results);
    });
});

app.delete('/transactions/:id', bodyParser.json(), (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM transactions WHERE id=${id};`, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.put('/transactions/:id', bodyParser.json(), (req, res) => {
  const id = req.params.id;
  const body = req.body;

  connection.query(`UPDATE transactions
	SET concept="${body.concept}",
  amount=${body.amount},
  date="${body.date}",
  type="${body.type}",
  categoryId=${body.categoryId}
	WHERE id=${id};`,
    (error, results) => {
      if (error) throw error;
      console.log(results);
      res.json(results);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});