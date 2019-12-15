var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();


var paramsProductID = {
    TableName : "Products",
    IndexName : "ProductIDIndex",
    KeyConditionExpression: "ProductID = :productID",
    ExpressionAttributeValues: {
        ":productID": "P128"
    }
};

var paramsAllProductByCategory = {
    TableName : "Products",
    KeyConditionExpression: "CategoryName = :categoryName",
    ExpressionAttributeValues: {
        ":categoryName": "Điện tử"
    }
}

var paramsSortedProductViewed = {
    TableName : "Products",
    IndexName : "TopViewsInCategoryIndex",
    KeyConditionExpression: "CategoryName = :categoryName",
    ExpressionAttributeValues: {
        ":categoryName": "Điện tử"
    },
    ScanIndexForward: false
}

var paramsFilter = {
    TableName : "Products",
    KeyConditionExpression: "CategoryName = :categoryName",
    FilterExpression: "Brand = :brand AND Color = :color",
    ExpressionAttributeValues: {
        ":categoryName": "Điện tử",
        ":brand" : "Sony",
        ":color" : "Red"
    }
}

var paramsProductByName = {
    TableName : "Products",
    KeyConditionExpression: "CategoryName = :categoryName",
    FilterExpression: "contains(ProductName,:productName)",
    ExpressionAttributeValues: {
        ":categoryName": "Điện lạnh",
        ":productName" : "giặt"
    }
}

docClient.query(paramsFilter, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(item);
        });
    }
});
