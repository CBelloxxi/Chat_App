const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

require('dotenv').config();

const secret_key = process.env.APIKEY;
const api_key = secret_key;


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

if (api_key != secret_key) {
  return res.status(403).send({message: "Your API KEY was incorrect"});
} else {
  app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
      const r = await axios.put(
        'https://api.chatengine.io/users/',
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": `${secret_key}` } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

  app.listen(3001, (error) => {
    if (error) {
      console.error("Failed to start server:", error);
    } else {
      console.log("Server started on port 3001");
    }
  });
}
