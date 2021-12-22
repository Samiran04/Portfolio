const express = require("express");
const app = express();
const port = 8080;
const db = require("./config/mongoose");

app.use(express.urlencoded());

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running on server ${err}`);
    return;
  }

  console.log(`Server is running on port ${port}`);
});
