
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
var fs = require('fs');

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allUsersInfo = JSON.parse(fs.readFileSync('users.json', 'utf8'));

allUsersInfo.forEach(function(info) {
    var params = {
        TableName: "Users",
        Item: {
            "UserID": info.UserID,
            "Varies": info.Varies,
            "Email": info.Email,
            "FirstName" : info.FirstName,
            "LastName" : info.LastName,
            "Country" : info.Country,
            "Address" : info.Address,
            "City" : info.City,
            "ZipCode" : info.ZipCode,
            "Phone" : info.Phone,
            "Password" : info.Password,
            "Salt" : info.Salt,
            "Favorite" : info.Favorite,
            "TotalPrice" : info.TotalPrice,
            "Date" : info.Date,
            "DetailInfo" : info.DetailInfo,
            "Status" : info.Status,
            "Type" : info.Type
            
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