const client = require("./dbConnection")
const express = require("express");
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors())
// const logger = require("./logger");
client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.use(express.json());

// const db = require("./config/mongoose");
app.use("/api", require("./routes/api"));






app.listen(process.env.PORT || 4000, () => {
    console.log("done!!")
});

module.exports = app;
