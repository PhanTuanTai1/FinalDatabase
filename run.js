var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var paramsProductID = {
    TableName : "Orders",
};

var paramsUsers = {
    TableName : "Users",
};

docClient.scan(paramsProductID,(err,data) => {
    if(err) console.log(JSON.stringify(err));
    else {
        data.Items.forEach(item => {
            console.log(item);
        })
    }
})
