var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allOthers = JSON.parse(fs.readFileSync('others.json', 'utf8'));

allOthers.forEach(function(other) {
    var params = {
        TableName: "Others",
        Item: {
            "PrimaryKey" : other.PrimaryKey,
            "SortKey" : other.SortKey
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product, Error JSON:", JSON.stringify(err));
       } else {
           console.log("PutItem succeeded:");
       }
    });
});
