const express = require("express");

const router = express.Router();
const getData = require("../../controller/getAllData")

router.post("/get-grouped-data", getData.getGroupedData);
router.post("/get-avg-total-count",getData.getAvgAndTotal);

module.exports = router;
