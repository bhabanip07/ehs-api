var express = require('express');
var router = express.Router();
var licenseConditionService = require('../services/service.license-condtion');


/* save a new licenseCondition to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
        var licenseConditionService = require('../services/service.license-condtion');
		const licenseCondition = await licenseConditionService.create(body);

		if(body.guid != null)
		{
			licenseCondition.guid = body.guid;
		}
		// created the licenseCondition! 
		return res.status(201).json({ licenseCondition: licenseCondition });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a licenseCondition by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const licenseCondition = await licenseConditionService.retrieveLicense(req.params.id);
		return res.json({ licenseCondition: licenseCondition });
	}
	catch(err)
	{
		return next(err);
	}
});

/* retrieves retrieveAllLicense */
router.get('/', async (req, res, next) =>
{
	try
	{
		const licenseCondition = await licenseConditionService.retrieveAllLicense();
		return res.json({ licenseCondition: licenseCondition });
	}
	catch(err)
	{
		return next(err);
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
		// unexpected error
		return next(err);
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
		// unexpected error
		return next(err);
	}
});

module.exports = router;