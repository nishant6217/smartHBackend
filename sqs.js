const { config, SQS } = require('aws-sdk');


config.update({
    accessKeyId: process.env.SQS_AWS_ID,
    secretAccessKey: process.env.SQS_AWS_SECRET,
    region: process.env.SQS_AWS_REGION
});
const sqs = new SQS({
    apiVersion: '2012-11-05'
});
const queue = process.env.EVENT_QUEUE_NAME;


module.exports.pushMessageToSQS = async function (JsonData) {
    return new Promise((resolve, reject) => {
        sqs.sendMessage(
            {
                MessageBody: JSON.stringify(JsonData),
                QueueUrl: `https://sqs.${process.env.SQS_AWS_REGION}.amazonaws.com/${process.env.SQS_AWS_ACCOUNT_ID}/${queue}`
            },
            (err, data) => {
                if (err) reject(err);
                else {
                    resolve(data.MessageId);
                }
            }
        );
    });
}

module.exports.receiveMessageFromSQS = async function (params) {
    return new Promise((resolve, reject) => {
        sqs.receiveMessage(
            {
                ...params,
                QueueUrl: `https://sqs.${process.env.SQS_AWS_REGION}.amazonaws.com/${process.env.SQS_AWS_ACCOUNT_ID}/${queue}`
            },
            (err, data) => {
                if (err) reject(err);
                else {
                    resolve(data);
                }
            }
        );
    });
}

module.exports.deleteMessageFromSQS = async function (receiptHandle) {
    return new Promise((resolve, reject) => {
        sqs.deleteMessage(
            {
                QueueUrl: `https://sqs.${process.env.SQS_AWS_REGION}.amazonaws.com/${process.env.SQS_AWS_ACCOUNT_ID}/${queue}`,
                ReceiptHandle: receiptHandle
            },
            (err, data) => {
                if (err) reject(err);
                else {
                    resolve(data);
                }
            }
        );
    });
}
