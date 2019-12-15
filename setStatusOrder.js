var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Users",
    Key:{
        "UserID": "123456",
        "Varies": "6f7a29d8-9720-488c-8142-a3da6d58a952"
    },
    UpdateExpression: "set #st =:s",
    ExpressionAttributeNames:{
        "#st": "Status"
    },
    ExpressionAttributeValues:{
        ":s": "Completed"
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
