const express = require("express");
const path = require("path");

const app = express();

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("src", "index.html"));
});

app.listen(process.env.PORT || 5060, () => console.log("Server is running..."));
