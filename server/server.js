// Author: Bonnie Schulkin
// Minor Changes: Arthur Assuncao

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// CORS for react app, assuming port 3000
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// use middleware to serve static images
app.use(express.static('public'));

// read data from options file
const helloSundaeOptionsRaw = fs.readFileSync(
  './hello-sundae-options.json',
  'utf-8',
);
const helloSundaeOptions = JSON.parse(helloSundaeOptionsRaw);

app.get('/scoops', (req, res) => {
  // return data from file
  res.json(helloSundaeOptions.iceCreamFlavors);
});

app.get('/toppings', (req, res) => {
  // return data from file
  res.json(helloSundaeOptions.toppings);
});

app.post('/order', (req, res) => {
  // create a random order number
  const orderNumber = Math.floor(Math.random() * 10000000000);

  res
    // set status to 201 (created)
    .status(201)
    // return "order number" as the response
    .json({ orderNumber });
});

if (require.main === module) {
  app.listen(3030, () =>
    console.log('Hello Sundae server listening on port 3030!'),
  );
}

module.exports = app;
