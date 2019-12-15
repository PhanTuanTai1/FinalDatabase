var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var paramsCategories = {
    TableName : "Others",
    ProjectionExpression: "SortKey",
    KeyConditionExpression: "PrimaryKey = :primaryKey",
    ExpressionAttributeValues: {
        ":primaryKey": "Category"
    }
};

var paramsHot = {
    TableName : "Others",
    KeyConditionExpression: "PrimaryKey = :primaryKey",
    ExpressionAttributeValues: {
        ":primaryKey": "Hot"
    }
}
/*

// Danh sách category --> với từng category thì hiển thị ra tất cả sản phẩm thuộc category đó

const promise = new Promise((resolve, reject) => {
    docClient.query(paramsCategories, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            reject();
        } else {
            console.log("Query succeeded.");
            return resolve(data.Items)
        }
    });
})

promise.then(function(categories) {

    categories.forEach(cate => {
        var paramsAllProductByCategory = {
            TableName : "Products",
            KeyConditionExpression: "CategoryName = :categoryName",
            ExpressionAttributeValues: {
                ":categoryName": cate.SortKey
            }
        }

        docClient.query(paramsAllProductByCategory, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                console.log(data.Items);
            }
        });
    })

});*/

/*

// Danh sách sản phẩm hot --> với từng sản phẩm đó thì hiển thị ra tất cả thông tin của sản phẩm

const promise = new Promise((resolve, reject) => {
    docClient.query(paramsHot, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            reject();
        } else {
            console.log("Query succeeded.");
            return resolve(data.Items)
        }
    });
});

promise.then(function(hoties) {
    hoties.forEach(hot => {
        var paramsProductID = {
            TableName : "Products",
            IndexName : "ProductIDIndex",
            KeyConditionExpression: "ProductID = :productID",
            ExpressionAttributeValues: {
                ":productID": hot.SortKey
            }
        };

        docClient.query(paramsProductID, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                console.log(data.Items);
            }
        });
    })
});
*/