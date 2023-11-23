const express = require("express");
const app = express();
const PORT = 5372;
const PING_SERVER_URL = "http://server-ping:5372";
app.get("/", (req, res) => {
  // Attend un moment avant d'envoyer la requête "ping" au serveur-ping
  setTimeout(async () => {
    try {
      await axios.get(PING_SERVER_URL);
      res.send("Pong successful!");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error sending pong request.");
    }
  }, 500); // Attendez une demie seconde
});
app.listen(PORT, () => {
  console.log(`Server-pong listening on port ${PORT}`);
});
