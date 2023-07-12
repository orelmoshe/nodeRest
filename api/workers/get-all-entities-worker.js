import { parentPort, workerData } from 'node:worker_threads';

import { getAllStorageData } from '../services/storage';

const getAllEntities = async () => {
	try {
		const {} = workerData;
		const allEntities = await getAllStorageData();
		parentPort.postMessage(allEntities); // sending message back to main thread
	} catch (ex) {
		console.error(ex);
	}
};

getAllEntities();
