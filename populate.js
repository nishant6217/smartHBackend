require('dotenv').config();

const excelToJson = require('convert-excel-to-json');
const { pushMessageToSQS } = require("./sqs");
const { polling } = require("./polling");
const CHUNK_SIZE = 100;



(async () => {
    const result = excelToJson({
        sourceFile: "./Sample Datasheet.xlsx"
    });
    console.log('Start Data Queue');
    // for (const sheet in result) {
    //     const sheetData = result[sheet];
    //     sheetData.splice(0, 1);

    //     while (sheetData.length > 0) {
    //         const dataArr = sheetData.splice(0, CHUNK_SIZE);

    //         const res = await Promise.all(
    //             dataArr.map(row => pushMessageToSQS({
    //                 sensorId: row.A,
    //                 timeStamp: row.B,
    //                 duration: row.C,
    //                 current: row.D,
    //                 voltage: row.E
    //             }))
    //         );

    //     }
    // }
    console.log('End Data Queue');
    console.log("Start Data Polling")
    await polling();
    console.log("End Data Polling")

    process.exit(0);

})();


