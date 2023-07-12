import joi from '@hapi/joi';
import { faker } from '@faker-js/faker';
import cacheLayer from '../services/cache';
import dotenv from 'dotenv';
dotenv.config();

import { HttpCodes, Status } from '../shared';
import { createEntitiesContinueProcessing, getActionsIds, getDataByActionId, uploadCsvContinueProcessing } from '../services/storage';

export const getHealth = (req, res, next) => {
	let response_data;
	try {
		response_data = { data: 'isAlive', statusCode: HttpCodes.OK, message: null };
		res.status(HttpCodes.OK).json(response_data);
	} catch (ex) {
		const err = `Failed to check health check,Error:${ex}`;
		console.error(err);
		response_data = { data: null, statusCode: HttpCodes.ERROR, message: err };
		res.status(HttpCodes.ERROR).json(response_data);
	}
};

export const getEntities = async (req, res, next) => {
	let response_data;
	try {
		const schema = joi.object().keys({
			actionId: joi.string().required(),
		});

		const result = schema.validate(req.params);

		if (result.error) {
			throw result.error.message;
		}
		const { actionId } = req.params;
		if (cacheLayer.has(actionId)) {
			const value = cacheLayer.get(actionId);
			console.log(`Final to get stored data on a actionId: ${actionId} from Cache`);
			response_data = { data: value, statusCode: HttpCodes.OK, message: 'Cache' };
			return res.status(HttpCodes.OK).json(response_data);
		}
		const { data } = await getDataByActionId(actionId);
		response_data = { data, statusCode: HttpCodes.OK, message: null };
		res.status(HttpCodes.OK).json(response_data);
	} catch (ex) {
		const err = `Failed to get entities,Error:${ex}`;
		console.error(err);
		response_data = { data: null, statusCode: HttpCodes.ERROR, message: err };
		res.status(HttpCodes.ERROR).json(response_data);
	}
};

export const createEntities = (req, res, next) => {
	let response_data;
	try {
		const actionId = faker.datatype.uuid();
		createEntitiesContinueProcessing(req.body?.numOfEntities || 5, actionId);
		response_data = { data: actionId, statusCode: HttpCodes.CREATED, message: Status.ON_ANALYSIS };
		res.status(HttpCodes.CREATED).json(response_data);
	} catch (ex) {
		const err = `Failed to create fake entities,Error:${ex}`;
		console.error(err);
		response_data = { data: null, statusCode: HttpCodes.ERROR, message: err };
		res.status(HttpCodes.ERROR).json(response_data);
	}
};

export const getAllActionIds = async (req, res, next) => {
	let response_data;
	try {
		const ids = await getActionsIds();
		response_data = { data: ids, statusCode: HttpCodes.OK, message: null };
		res.status(HttpCodes.OK).json(response_data);
	} catch (ex) {
		const err = `Failed to get all action Ids,Error:${ex}`;
		console.error(err);
		response_data = { data: null, statusCode: HttpCodes.ERROR, message: err };
		res.status(HttpCodes.ERROR).json(response_data);
	}
};

export const uploadCsv = async (req, res, next) => {
	let response_data;
	try {
		uploadCsvContinueProcessing();
		response_data = { data: null, statusCode: HttpCodes.OK, message: Status.ON_ANALYSIS };
		res.status(HttpCodes.CREATED).json(response_data);
	} catch (ex) {
		const err = `Failed to upload csv,Error:${ex}`;
		console.error(err);
		response_data = { data: null, statusCode: HttpCodes.ERROR, message: err };
		res.status(HttpCodes.ERROR).json(response_data);
	}
};
