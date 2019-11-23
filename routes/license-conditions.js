var express = require('express');
var router = express.Router();
var licenseConditionService = require('../services/service.license-condtion');

var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "http://dynamodb.us-east-1.amazonaws.com",
//   accessKeyId: "ASIARL7AQUYYFZ45UFV7", secretAccessKey: "MwlwRkzCFRZ+wlnkgnhIjcG/QtRTUo57Z1z1O5gK",
//   aws_session_token: "FQoGZXIvYXdzENz//////////wEaDFUHXWC9WeKvpxrt0iLsAd/zl/CUKqUQDcyX32KaC/rh2/fuINM+efaq9oIBfWHopwfwDrRJplNRafMaWJ8pNhmDJJqWRL42a3bdRaAANe4Z3FVKCwucSh3dMJHu0PXYYk1yq9kEikB8+AMS2AoDCaNXIAYWjjambrZffmlurp18LCT3oeXyuFjD9heN9iAtlX/zoFA6K/4nfWKXUftuJOUcc1P1TcOlApwALKVAGOmAxf+6PlkR+NgTD/SD5OSjPR7hiZy8hiQWVorio/RGbMnoYEeMCRK12TOeMoqotoOX3IFtGZ+XnU6C2wNWwUuKMUxLqBBwQmuR68kmKK/66u0F; Expires Oct 31, 2019 5:23 PM"
// });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "LicenseCondition";
/* save a new licenseCondition to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
    // var licenseConditionService = require('../services/service.license-condtion');
		// const licenseCondition = await licenseConditionService.create(body);

		// if(body.guid != null)
		// {
		// 	licenseCondition.guid = body.guid;
		// }
		// // created the licenseCondition!
		// return res.status(201).json({ licenseCondition: licenseCondition });


		var params = {
			TableName:table,
			Item:{
				"licenseNumber": body.licenseNumber,
				"licenseType":  body.licenseType,
				"siteLocation":  body.siteLocation,
				"issueDate":  body.issueDate,
				"expirationDate":  body.expirationDate,
				"renewalDate":  body.renewalDate,
				"possessionLimitsFlourine":  body.possessionLimitsFlourine,
				"possessionLimitsNitrogen":  body.possessionLimitsNitrogen,
				"possessionLimitsOxygen":  body.possessionLimitsOxygen,
				"possessionLimitsCarbon":  body.possessionLimitsCarbon,
				"reports": body.reports,
				"feeType":  body.feeType,
				"feePaymentInstruction":  body.feePaymentInstruction,
				"lastFeeDate": body.lastFeeDate,
				"rso":  body.rso,
				"authorizedNuclearPharmacist":  body.authorizedNuclearPharmacist,
				"authorizedUser":  body.authorizedUser,
				"cyclotronOperator":  body.cyclotronOperator,
				"physicalPresenceRequirement":  body.physicalPresenceRequirement,
				"sealedSourceLeakTest":  body.sealedSourceLeakTest,
				"sealedSourceInventory":  body.sealedSourceInventory,
				"otherRequirements":  body.otherRequirements,
			}
		};

		console.log("Adding a new LicenseCondition...");
		docClient.put(params, function(err, data) {
			if (err) {
				console.error("Unable to add LicenseCondition. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				res.setHeader('Content-Type', 'application/json');
				var jsonObject = JSON.stringify({
					licenseNumber: data.Item.licenseNumber,
					licenseType: data.Item.licenseType,
					siteLocation: data.Item.siteLocation,
					issueDate: data.Item.issueDate,
					expirationDate: data.Item.expirationDate,
					renewalDate: data.Item.renewalDate,
					possessionLimitsFlourine: data.Item.possessionLimitsFlourine,
					possessionLimitsNitrogen: data.Item.possessionLimitsNitrogen,
					possessionLimitsOxygen: data.Item.possessionLimitsOxygen,
					possessionLimitsCarbon: data.Item.possessionLimitsCarbon,
					reports: data.Item.reports,
					feeType:  data.Item.feeType,
					feePaymentInstruction: data.Item.feePaymentInstruction,
					lastFeeDate: data.Item.lastFeeDate,
					rso: data.Item.rso,
					authorizedNuclearPharmacist: data.Item.authorizedNuclearPharmacist,
					authorizedUser: data.Item.authorizedUser,
					cyclotronOperator: data.Item.cyclotronOperator,
					physicalPresenceRequirement: data.Item.physicalPresenceRequirement,
					sealedSourceLeakTest: data.Item.sealedSourceLeakTest,
					sealedSourceInventory: data.Item.sealedSourceInventory,
					otherRequirements: data.Item.otherRequirements,
				 }, null, 2);

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
					"licenseNumber": req.params.id,
				}
			};
			console.log("reading a new item...");
			docClient.get(params, function(err, data) {
				if (err) {
					console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({
						licenseNumber: data.Item.licenseNumber,
						licenseType: data.Item.licenseType,
						siteLocation: data.Item.siteLocation,
						issueDate: data.Item.issueDate,
						expirationDate: data.Item.expirationDate,
						renewalDate: data.Item.renewalDate,
						possessionLimitsFlourine: data.Item.possessionLimitsFlourine,
						possessionLimitsNitrogen: data.Item.possessionLimitsNitrogen,
						possessionLimitsOxygen: data.Item.possessionLimitsOxygen,
						possessionLimitsCarbon: data.Item.possessionLimitsCarbon,
						reports: data.Item.reports,
						feeType:  data.Item.feeType,
						feePaymentInstruction: data.Item.feePaymentInstruction,
						lastFeeDate: data.Item.lastFeeDate,
						rso: data.Item.rso,
						authorizedNuclearPharmacist: data.Item.authorizedNuclearPharmacist,
						authorizedUser: data.Item.authorizedUser,
						cyclotronOperator: data.Item.cyclotronOperator,
						physicalPresenceRequirement: data.Item.physicalPresenceRequirement,
						sealedSourceLeakTest: data.Item.sealedSourceLeakTest,
						sealedSourceInventory: data.Item.sealedSourceInventory,
						otherRequirements: data.Item.otherRequirements,
					 }, null, 2));
				}
			});
		}
		else
		{
			throw new Error('Unable to retrieve a licenseCondition by (licenseCondition_Id:'+ license_id +')');
		}
   }
	catch(err)
	{
		return res.status(400).json({ error: err.message });
	}

});

/* retrieves retrieveAllLicense */
router.get('/', async (req, res, next) =>
{
	try{

				var params = {
					TableName: table,
					Key:{
						"licenseNumber": req.params.id,
					}
				};
				console.log("reading a multiple license item...");
				docClient.get(params, function(err, data) {
					if (err) {
						console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
					} else {
						res.setHeader('Content-Type', 'application/json');
						var jsonObject={};
						var key = 'Item';
						jsonObject[key] = [];
						for (var i = 0; i < data.Item.length; i++) {
								console.log("licenseNumber is :" + data.Item[i].licenseNumber);
								var details={
										licenseNumber: data.Item[i].licenseNumber,
										licenseType: data.Item[i].licenseType,
										siteLocation: data.Item[i].siteLocation,
										issueDate: data.Item[i].issueDate,
										expirationDate: data.Item[i].expirationDate,
										renewalDate: data.Item[i].renewalDate,
										possessionLimitsFlourine: data.Item[i].possessionLimitsFlourine,
										possessionLimitsNitrogen: data.Item[i].possessionLimitsNitrogen,
										possessionLimitsOxygen: data.Item[i].possessionLimitsOxygen,
										possessionLimitsCarbon: data.Item[i].possessionLimitsCarbon,
										reports: data.Item[i].reports,
										feeType:  data.Item[i].feeType,
										feePaymentInstruction: data.Item[i].feePaymentInstruction,
										lastFeeDate: data.Item[i].lastFeeDate,
										rso: data.Item[i].rso,
										authorizedNuclearPharmacist: data.Item[i].authorizedNuclearPharmacist,
										authorizedUser: data.Item[i].authorizedUser,
										cyclotronOperator: data.Item[i].cyclotronOperator,
										physicalPresenceRequirement: data.Item[i].physicalPresenceRequirement,
										sealedSourceLeakTest: data.Item[i].sealedSourceLeakTest,
										sealedSourceInventory: data.Item[i].sealedSourceInventory,
										otherRequirements: data.Item[i].otherRequirements,
								};
								jsonObject[key].push(details);
						}
						res.send({
								success: true,
								code: 200,
								data :JSON.stringify(jsonObject)
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

/* removes the licenseCondition from the licenseCondition list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const licenseCondition = await licenseConditionService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
			return res.status(400).json({ error: err.message });
	}
});

module.exports = router;
