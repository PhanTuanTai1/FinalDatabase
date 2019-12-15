var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var paramsOrderDetail = {
    TableName : "Orders",
    KeyConditionExpression: "OrderID = :orderID",
    ExpressionAttributeValues: {
        ":orderID": "Nu1DwpSkwm"
    }
};

docClient.query(paramsOrderDetail, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(item);
        });
    }
});
