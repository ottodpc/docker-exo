const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const registeredServers = {};

const PORT = 8080;

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { serverName, serverAddress } = req.body;
  registeredServers[serverName] = serverAddress;
  console.log(`${serverName} registered at ${serverAddress}`);
  res.send("Registration successful!");
});

app.get("/get-address/:serverName", (req, res) => {
  const serverName = req.params.serverName;
  const serverAddress = registeredServers[serverName];
  if (serverAddress) {
    res.send(serverAddress);
  } else {
    res.status(404).send("Server not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server-registry listening on port ${PORT}`);
});
