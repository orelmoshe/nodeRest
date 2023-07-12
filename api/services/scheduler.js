import { CronJob } from 'cron';

import { uploadCsvContinueProcessing } from './storage';

export const cronJob = new CronJob('0 0 1 * *', async () => {
	try {
		const jobEveryMonth = async () => {
			try {
				uploadCsvContinueProcessing();
			} catch (ex) {
				const err = `Failed to upload csv - jobEveryMonth,Error:${ex}`;
				console.error(err);
			}
		};
		await jobEveryMonth();
	} catch (ex) {
		const err = `Failed while trying to definition CronJob function, Error : ${JSON.stringify(ex)}`;
		console.error(err);
		process.exit(1);
	}
});

if (!cronJob?.running) {
	cronJob.start();
}
