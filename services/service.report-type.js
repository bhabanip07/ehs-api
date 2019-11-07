var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "http://dynamodb.us-east-1.amazonaws.com",
//   accessKeyId: "ASIARL7AQUYYFZ45UFV7", secretAccessKey: "MwlwRkzCFRZ+wlnkgnhIjcG/QtRTUo57Z1z1O5gK",
//   aws_session_token: "FQoGZXIvYXdzENz//////////wEaDFUHXWC9WeKvpxrt0iLsAd/zl/CUKqUQDcyX32KaC/rh2/fuINM+efaq9oIBfWHopwfwDrRJplNRafMaWJ8pNhmDJJqWRL42a3bdRaAANe4Z3FVKCwucSh3dMJHu0PXYYk1yq9kEikB8+AMS2AoDCaNXIAYWjjambrZffmlurp18LCT3oeXyuFjD9heN9iAtlX/zoFA6K/4nfWKXUftuJOUcc1P1TcOlApwALKVAGOmAxf+6PlkR+NgTD/SD5OSjPR7hiZy8hiQWVorio/RGbMnoYEeMCRK12TOeMoqotoOX3IFtGZ+XnU6C2wNWwUuKMUxLqBBwQmuR68kmKK/66u0F; Expires Oct 31, 2019 5:23 PM"
// });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "license-condition";

/* static customer service class */
class reportService
{
	static createReport(data)
	{
		var params = {
			TableName:table,
			Item:{
				"id": "9587",
				"reportType": "BBSR",
				"fileUrl": "Bhabani",
				"fileName": "OR",
				"dueDate": "9587",
				"licenseCondition_Id": "BBSR",
			}
		};
		
		console.log("Adding a new ReportAdd...");
		docClient.put(params, function(err, data) {
			if (err) {
				console.error("Unable to add Report. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				return JSON.stringify(data, null, 2);
			}
		});
	}

	static retrieveReport(report_id)
	{
		if(report_id != null)
		{
			var params = {
				TableName: table,
				Key:{
					"id": report_id,
				}
			};
			console.log("reading retrieveReport...");
			docClient.get(params, function(err, data) {
				if (err) {
					console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					return JSON.stringify(data, null, 2);
				}
			});
		}
		else
		{
			throw new Error('Unable to retrieve a licenseCondition by (licenseCondition_Id:'+ licenseCondition_Id +')');
		}
	}

	static retrieveReportPerLicense(license_id)
	{
		var params = {
			TableName: table,
			Key:{
				"licenseCondition_Id": license_id,
			}
		};
		console.log("reading retrieveReportPerLicense...");
		docClient.get(params, function(err, data) {
			if (err) {
				console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				return JSON.stringify(data, null, 2);
			}
		});
	}

	static update(uid, data)
	{
		if(customers[uid] != null)
		{
			const customer = customers[uid];
			
			Object.assign(customer, data);
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(customers[uid] != null)
		{
			delete customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}
}

module.exports = reportService;