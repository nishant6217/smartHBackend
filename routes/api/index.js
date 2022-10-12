const express = require("express");

const router = express.Router();
const getData = require("../../controller/getAllData")
console.log(process.env.DB_HOST)
router.post("/get-grouped-data", getData.getGroupedData);
router.post("/get-avg-total-count",getData.getAvgAndTotal);

module.exports = router;
