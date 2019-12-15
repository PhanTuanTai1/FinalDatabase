var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing products into DynamoDB. Please wait.");

var params = {
    TableName: "Products",
    Item: {
        "CategoryName":  "Điện tử",
        "ProductID": "Test01",
        "ProductName": "product.ProductName",
        "TotalView" : 1,
        "Brand" :" product.Brand",
        "Color" : "product.Color",
        "Star" : 5,
        "Price" : 156000
    }
};

docClient.put(params, function(err, data) {
   if (err) {
       console.error("Unable to add product, Error JSON:", JSON.stringify(err));
   } else {
       console.log("PutItem succeeded:");
   }
});  
