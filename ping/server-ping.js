const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 4567;
const PONG_SERVER_URL = "http://server-pong:4567";
app.get("/", async (req, res) => {
  try {
    // Envoie une requête "pong" au serveur-pong
    await axios.get(PONG_SERVER_URL);
    res.send("Ping successful!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error sending ping request.");
  }
});
app.listen(PORT, () => {
  console.log(`Server-ping listening on port ${PORT}`);
});
