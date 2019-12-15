var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });

var dynamodb = new AWS.DynamoDB();

var TableUserparams = {
    TableName : "Users",
    KeySchema: [       
        { AttributeName: "UserID", KeyType: "HASH"},  //Partition key
        { AttributeName: "Varies", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "UserID", AttributeType: "S" },
        { AttributeName: "Varies", AttributeType: "S" },
        { AttributeName: "Email", AttributeType: "S" },
        { AttributeName: "Status", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: "VariesIndex",
            KeySchema: [
                {
                    AttributeName: "Varies",
                    KeyType: "HASH"
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        },
        {
            IndexName: "EmailIndex",
            KeySchema: [
                {
                    AttributeName: "Email",
                    KeyType: "HASH"
                }
            ],
            Projection: {
                NonKeyAttributes: [
                    "Password","Salt"
                ],
                ProjectionType: "INCLUDE"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        },
        {
            IndexName: "StatusIndex",
            KeySchema: [
                {
                    AttributeName: "Status",
                    KeyType: "HASH"
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ]
};

var TableProductparams = {
    TableName : "Products",
    KeySchema: [       
        { AttributeName: "CategoryName", KeyType: "HASH"},  //Partition key
        { AttributeName: "ProductID", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "CategoryName", AttributeType: "S" },
        { AttributeName: "ProductID", AttributeType: "S" },
        // { AttributeName: "ProductName", AttributeType: "S" },
        { AttributeName: "TotalView", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: "ProductIDIndex",
            KeySchema: [
                {
                    AttributeName: "ProductID",
                    KeyType: "HASH"
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "TopViewsInCategoryIndex",
            KeySchema: [
                {
                    AttributeName: "CategoryName",
                    KeyType: "HASH"
                },
                { 
                    AttributeName: "TotalView", 
                    KeyType: "RANGE" 
                } 
            ],
            Projection: {
                ProjectionType: "ALL"
            }
        }
    ]
};

var TableOtherparams = {
    TableName : "Others",
    KeySchema: [       
        { AttributeName: "PrimaryKey", KeyType: "HASH"},
        { AttributeName: "SortKey", KeyType: "RANGE"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "PrimaryKey", AttributeType: "S" },
        { AttributeName: "SortKey", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

var TableOrderparams = {
    TableName : "Orders",
    KeySchema: [       
        { AttributeName: "OrderID", KeyType: "HASH"},
        { AttributeName: "ProductID", KeyType: "RANGE"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "OrderID", AttributeType: "S" },
        { AttributeName: "ProductID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
}



 dynamodb.createTable(TableUserparams, function(err, data) {
     if (err) {
         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
     } else {
         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
     }
 });

dynamodb.createTable(TableProductparams, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

 dynamodb.createTable(TableOrderparams, function(err, data) {
     if (err) {
         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
     } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
     }
 });

 dynamodb.createTable(TableOtherparams, function(err, data) {
     if (err) {
         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
   } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
     }
});
