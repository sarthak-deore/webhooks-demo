const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const messages = [];

const authMiddleware = (req, res, next) => {
  const secretHeader = req.headers["x-secret"];
  if (secretHeader !== process.env.WEBHOOK_SECRET) {
    return res.sendStatus(401);
  }
  next();
};

app.post("/git-info", authMiddleware,(req, res) => {
  const data = req.body;
  messages.push(data);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  return res.json(messages);
});

const PORT = process.env.PORT || 5601;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
