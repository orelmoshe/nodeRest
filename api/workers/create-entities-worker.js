import { parentPort, workerData } from 'node:worker_threads';

import { config } from '../config';
import { createFakerEntities } from '../models/faker';
import { writeStorageFile } from '../services/storage';

const createEntities = async () => {
	try {
		const { count, actionId } = workerData;
		const users = createFakerEntities(count || 5, actionId);
		await writeStorageFile(`${config.STORE_NAME}.${actionId}`, { data: users });
		parentPort.postMessage(users);
	} catch (ex) {
		console.error(ex);
	}
};

createEntities();
