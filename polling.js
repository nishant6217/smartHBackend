const { receiveMessageFromSQS, deleteMessageFromSQS } = require('./sqs');
const client = require("./dbConnection")


client.connect(async function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});



async function polling() {

    const request = {
        AttributeNames: ['All'],
        MessageAttributeNames: ['All'],
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 120,
        WaitTimeSeconds: 2
    };
    try {

        const receiveObject = await receiveMessageFromSQS(
            request
        );

        if (receiveObject.Messages && receiveObject.Messages instanceof Array) {


            if (receiveObject.Messages.length == 0) return;


            let sqlInserRows = [];
            //Process message
            for (const data of receiveObject.Messages) {
                //ToDo Data insert into DB
                const finalData = JSON.parse(data.Body);

                sqlInserRows.push(`('${finalData.sensorId || 0}',${finalData.timeStamp || 0},${finalData.duration || 0},${finalData.current || 0},${finalData.voltage || 0})`);
            }

            if (sqlInserRows.length > 0) {
                try {
                    await client.query(`INSERT INTO records  ("sensorId","timeStamps",duration,currents,voltage) values ${sqlInserRows.join(',')}`);

                    await Promise.all(
                        receiveObject.Messages.map(data => deleteMessageFromSQS(data.ReceiptHandle))
                    )

                } catch (err) {
                    console.log(sqlInserRows)
                    console.error(err)
                }
            }


            await polling();
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = { polling };