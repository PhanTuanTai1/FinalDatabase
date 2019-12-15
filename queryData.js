
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
  });


var docClient = new AWS.DynamoDB.DocumentClient();


// 1. Tìm một đơn hàng khi biết mã đơn hàng
var paramsOrderID = {
    TableName : "Users",
    IndexName: "VariesIndex",
    KeyConditionExpression: "Varies = :varies",
    ExpressionAttributeValues: {
        ":varies": "Nu1DwpSkwm"
    }
}

// 2. Tìm tất cả đơn hàng mà khách hàng đặt, tìm hết r vào vòng lặp lọc ra, cái item nào có userid = varies thì loại

var paramsAllOrderByCusID = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :id",
    ExpressionAttributeValues: {
        ":id": "123456"
    }
}


// 3. Tìm tất cả thông tin khách hàng theo ID

var paramsUserInfo = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :id AND Varies = :varies",
    ExpressionAttributeValues: {
        ":id": "123456",
        ":varies" : "125456"
    }
}

// 4. Tìm user theo email để đăng nhập

var paramsEmail = {
    TableName : "Users",
    IndexName: "EmailIndex",
    KeyConditionExpression: "Email = :email",
    ExpressionAttributeValues: {
        ":email": "nguyenlenamanh@gmail.com"
    }
};

docClient.query(paramsUserInfo, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        console.log(data.Items);
    }
});
