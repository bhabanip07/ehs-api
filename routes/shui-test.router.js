var express = require('express');
var router = express.Router();
// var licenseConditionService = require('../services/service.license-condtion');

var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "http://dynamodb.us-east-1.amazonaws.com",
//   accessKeyId: "ASIARL7AQUYYFZ45UFV7", secretAccessKey: "MwlwRkzCFRZ+wlnkgnhIjcG/QtRTUo57Z1z1O5gK",
//   aws_session_token: "FQoGZXIvYXdzENz//////////wEaDFUHXWC9WeKvpxrt0iLsAd/zl/CUKqUQDcyX32KaC/rh2/fuINM+efaq9oIBfWHopwfwDrRJplNRafMaWJ8pNhmDJJqWRL42a3bdRaAANe4Z3FVKCwucSh3dMJHu0PXYYk1yq9kEikB8+AMS2AoDCaNXIAYWjjambrZffmlurp18LCT3oeXyuFjD9heN9iAtlX/zoFA6K/4nfWKXUftuJOUcc1P1TcOlApwALKVAGOmAxf+6PlkR+NgTD/SD5OSjPR7hiZy8hiQWVorio/RGbMnoYEeMCRK12TOeMoqotoOX3IFtGZ+XnU6C2wNWwUuKMUxLqBBwQmuR68kmKK/66u0F; Expires Oct 31, 2019 5:23 PM"
// });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "FeeType";
/* save a new licenseCondition to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		var params = {
			TableName:table,
			Item:{
                "fee_Id": Math.floor((Math.random() * 10) + 1).toString(),
				"name": body.name,
				"age":  body.age,
				"dob":  body.dob,
				"address":  body.address,
				"fileName": body.fileName,
				"fileUrl" : body.fileUrl,
			}
		};

		console.log("Adding a new studen...");
		docClient.put(params, function(err, data) {
			if (err) {
				console.error("Unable to add studen. Error JSON:", JSON.stringify(err, null, 2));
			} else {
                // console.log(data),
				res.setHeader('Content-Type', 'application/json');
				// var jsonObject = JSON.stringify({
				// 	fee_Id: data.Item.fee_Id,
				// 	name: data.Item.name,
				// 	age: data.Item.age,
				// 	address: data.Item.address,
				// 	dob: data.Item.dob,
				//  }, null, 2);

				 res.send({
					 success: true,
                     code: 200,
                     data:data,
				});

			}
		});

	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}
	}
});

/* retrieves a licenseCondition by uid */
router.get('/:id',  (req, res, next) =>
{

try{
		if(req.params.id != null)
		{
			var params = {
				TableName: table,
				Key:{
					"fee_Id": req.params.id,
				}
			};
			console.log("reading a new item...");
			docClient.get(params, function(err, data) {
				if (err) {
					console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({
						fee_Id: data.Items.fee_Id,
						age: data.Items.age,
						address: data.Items.address,
						dob: data.Items.dob,
						name: data.Items.name,
						fileName: data.Items.fileName,
						fileUrl : data.Items.fileUrl,
					 }, null, 2));
				}
			});
		}
		else
		{
			throw new Error('Unable to retrieve a FeeType by (licenseCondition_Id:'+ fee_Id +')');
		}
   }
	catch(err)
	{
		return res.status(400).json({ error: err.message });
	}

});

/* retrieves All students from Table */
router.get('/', async (req, res, next) =>
{
	try{
            var params = {
                TableName: table,
            };
            console.log("reading a multiple student item...");
            docClient.scan(params, function(err, data) {
                if (err) {
                    console.error("Unable to read student. Error JSON:", JSON.stringify(err, null, 2));
                } else {
					console.log(data.Items);
                    res.setHeader('Content-Type', 'application/json');
                    // var jsonObject={};
                   
                    var jsonObject= [];
                    for (var i = 0; i < data.Items.length; i++) {
                            var details={
                                    fee_Id: data.Items[i].fee_Id,
                                    age: data.Items[i].age,
                                    name: data.Items[i].name,
                                    dob: data.Items[i].dob,
									address: data.Items[i].address,
									fileName: data.Items[i].fileName,
									fileUrl : data.Items[i].fileUrl,
                            };
                            jsonObject.push(details);
                    }
                    res.send({
                            success: true,
                            code: 200,
                            data :jsonObject
                    });
                }
            });
	   }
		catch(err)
		{
			return res.status(400).json({ error: err.message });
		}
});

/* updates the licenseCondition by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const licenseCondition = await licenseConditionService.update(req.params.id, req.body);

		return res.json({ customer: licenseCondition });
	}
	catch(err)
	{
		return res.status(400).json({ error: err.message });
	}
});

router.delete('/:id', async (req, res, next) =>
{
	if(req.params.id != null)
	{
		console.log(req.params.id);
		var params = {
			TableName: table,
			Key:{
				"fee_Id": req.params.id,
			},
			// ConditionExpression:"fee_Id = :val",
			// ExpressionAttributeValues: {
			// 	":val": req.params.id
			// }
		};
		docClient.delete(params, function(err, data) {
			if (err) {
				console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("deleted...");
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({
					fee_Id: data.Items.fee_Id,
					age: data.Items.age,
					address: data.Items.address,
					dob: data.Items.dob,
					name: data.Items.name,
					fileName: data.Items.fileName,
					fileUrl : data.Items.fileUrl,
				 }, null, 2));
			}
		});
	}
	else
	{
		throw new Error('Unable to delete student  (fee_Id:'+ fee_Id +')');
	}
});

module.exports = router;
