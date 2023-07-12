import { Worker } from 'node:worker_threads';
import path from 'path';
import fsp from 'fs/promises';

import { config } from '../config';
import cacheLayer from './cache';
import { createCsv } from './excel';
import { sendMail } from './email';
import { uploadExcelToS3Aws } from './s3';

export const writeStorageFile = async (fileName, data) => {
	try {
		await fsp.writeFile(`./${config.STORAGE_DIR_NAME}/${fileName}.json`, JSON.stringify(data));
	} catch (ex) {
		const err = `Failed to save fake entities,Error:${ex}`;
		console.error(err);
	}
};

export const getDataByActionId = async (actionId) => {
	try {
		const files = await fsp.readdir(`./${config.STORAGE_DIR_NAME}`);
		const fileName = files.find((name) => name.includes(actionId));
		const jsonData = await fsp.readFile(`./${config.STORAGE_DIR_NAME}/${fileName}`, 'utf8');
		const data = JSON.parse(jsonData);
		return data;
	} catch (ex) {
		const err = `Failed to get fake entities by actionId = ${actionId},Error:${ex}`;
		console.error(err);
		return null;
	}
};

export const getActionsIds = async () => {
	try {
		const files = await fsp.readdir(`./${config.STORAGE_DIR_NAME}`);
		const ids = files.map((name) => name.split('.')[1]);
		return ids;
	} catch (ex) {
		const err = `Failed to get actions ids,Error:${ex}`;
		console.error(err);
		return null;
	}
};

export const isFileExist = async (actionId) => {
	try {
		const files = await fsp.readdir(`./${config.STORAGE_DIR_NAME}`);
		return files.some((name) => name.includes(actionId));
	} catch (ex) {
		const err = `Failed to check if file of actionId: ${actionId} is exist,Error:${ex}`;
		console.error(err);
		return null;
	}
};

const isDirExist = async (path) =>
	await fsp
		.access(path)
		.then(() => true)
		.catch(() => false);

export const resetStorage = async () => {
	try {
		const storagePath = `./${config.STORAGE_DIR_NAME}`;
		const shouldDeleteStorage = await isDirExist(storagePath);
		if (shouldDeleteStorage) {
			await fsp.rm(storagePath, { recursive: true });
		}
		await fsp.mkdir(storagePath);
		const excelPath = `./${config.EXCEL_OUTPUT_DIR_NAME}`;
		const shouldDeleteExcelStorage = await isDirExist(excelPath);
		if (shouldDeleteExcelStorage) {
			await fsp.rm(excelPath, { recursive: true });
		}
		await fsp.mkdir(excelPath);
	} catch (ex) {
		const err = `Failed to reset storage,Error:${ex}`;
		console.error(err);
	}
};

export const getAllStorageData = async () => {
	try {
		const path = `./${config.STORAGE_DIR_NAME}`;
		const files = await fsp.readdir(path);
		const promises = files.map(async (fileName) => await fsp.readFile(`./${config.STORAGE_DIR_NAME}/${fileName}`, 'utf8'));
		const promisesResults = await Promise.allSettled(promises);
		const promisesSuccessResults = promisesResults.filter((res) => res.status === 'fulfilled');
		const data = promisesSuccessResults.map((res) => JSON.parse(res.value).data);
		const allEntities = data.flat();
		return allEntities;
	} catch (ex) {
		const err = `Failed to get all storage data,Error:${ex}`;
		console.error(err);
	}
};

export const createEntitiesContinueProcessing = (count, actionId) => {
	const __dirname = path.resolve(path.dirname(''));
	const worker = new Worker(__dirname + '/api/workers/create-entities-worker.js', {
		workerData: { count, actionId },
	});
	worker.on('message', (users) => {
		cacheLayer.set(actionId, users);
	});
	worker.on('error', (error) => console.error('error:', error));
	worker.on('exit', (code) => code !== 0 && console.error(`Worker stopped with exit code ${code}`));
};

export const uploadCsvContinueProcessing = () => {
	const __dirname = path.resolve(path.dirname(''));
	const worker = new Worker(__dirname + '/api/workers/get-all-entities-worker.js', {
		workerData: {},
	});
	worker.on('message', async (allEntities) => {
		const fileName = await createCsv(allEntities);
		const pathFile = `./${config.EXCEL_OUTPUT_DIR_NAME}/${fileName}`;
		const mailOptions = {
			from: 'orelchenmoshe@gmail.com',
			to: 'orelchenmoshe@gmail.com',
			subject: `scan users result by ${new Date()}`,
			html: '<h2 style="color:#ff6600;">Attached file</h2>',
			attachments: [{ filename: fileName, path: pathFile }],
		};
		await sendMail(mailOptions);
		await uploadExcelToS3Aws(pathFile, fileName, config.S3_BUCKET_NAME);
	});
	worker.on('error', (error) => console.error('error:', error));
	worker.on('exit', (code) => code !== 0 && console.error(`Worker stopped with exit code ${code}`));
};
