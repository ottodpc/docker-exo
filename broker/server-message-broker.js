// server-message-broker.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const messages = {};

const PORT = 1111;

app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const { destination, message } = req.body;
  messages[destination] = message;
  console.log(`Message sent to ${destination}: ${message}`);
  res.send('Message sent successfully!');
});

app.post('/receive', (req, res) => {
  const { destination } = req.body;
  const message = messages[destination];
  if (message) {
    console.log(`Message received from ${destination}: ${message}`);
    delete messages[destination];
    res.send(message);
  } else {
    res.status(404).send('No message found for the destination.');
  }
});

app.listen(PORT, () => {
  console.log(`Server-message-broker listening on port ${PORT}`);
});
