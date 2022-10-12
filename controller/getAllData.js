const client = require("../dbConnection")

module.exports.getGroupedData = async (req, res) => {
    client.query(` SELECT "sensorId" , AVG(currents) FROM records GROUP BY "sensorId" order by AVG(currents) desc limit 12;
     `, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "ok", data: result.rows });
        } else {
            return res.status(400).json({ message: "failed" });
        }
    });
    client.end;
};

module.exports.getAvgAndTotal = async(req,res) =>{
    client.query(` select count(distinct ("sensorId")) as "totalSensorId" ,avg(currents) as "avgCurrent" , avg(voltage) as "avgVoltage"  from records r ;

     `, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "ok", data: result.rows });
        } else {
            return res.status(400).json({ message: "failed" });
        }
    });
    client.end;
}