const express = require("express");
const app = express();
const axios = require("axios");

const PORT = 5372;
const REGISTRY_URL = "http://server-registry:8080/register";

app.get("/", async (req, res) => {
  try {
    // Enregistrez l'adresse du serveur-pong auprès du serveur d'annuaire
    await axios.post(REGISTRY_URL, {
      serverName: "server-pong",
      serverAddress: `http://server-pong:${PORT}`,
    });

    // Obtenez l'adresse du serveur-ping depuis le serveur d'annuaire
    const pingServerAddress = await axios.get(
      "http://server-registry:8080/get-address/server-ping"
    );

    // Attendre une demie seconde avant d'envoyer la requête "ping" au serveur-ping
    setTimeout(async () => {
      await axios.get(pingServerAddress.data);
      res.send("Pong successful!");
    }, 500);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error sending pong request.");
  }
});

app.listen(PORT, () => {
  console.log(`Server-pong listening on port ${PORT}`);
});
