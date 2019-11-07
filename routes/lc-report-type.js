var express = require('express');
var router = express.Router();
var reportService = require('../services/service.report-type');


/* save a new reportService to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
        // var reportService = require('../services/service.report-type');
		const report = await reportService.createReport(body);

		// created the reportService! 
		return res.status(201).json({ reportTypes: report });
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

/* retrieves a reportService by id */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const report = await reportService.retrieveReport(req.params.id);
		return res.json({ reportService: report });
	}
	catch(err)
	{
		return next(err);
	}
});

/* retrieves retrieveReportPerLicense */
router.get('retrieveReportPerLicense/', async (req, res, next) =>
{
	try
	{
		const report = await reportService.retrieveReportPerLicense();
		return res.json({ reportService: report });
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