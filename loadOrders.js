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

var allOrders = JSON.parse(fs.readFileSync('orders.json', 'utf8'));

allOrders.forEach(function(order) {
    var params = {
        TableName: "Orders",
        Item: {
            "OrderID" : order.OrderID,
            "ProductID" : order.ProductID,
            "Quantity" : order.Quantity,
            "Price" : order.Price
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
