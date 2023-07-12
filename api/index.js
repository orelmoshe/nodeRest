import express from 'express';

import router from './routes/routes';
import { resetStorage } from './services/storage';
import { config } from './config';

import './services/scheduler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use('/api', router);

app.listen(config.PORT, config.HOST, async () => {
	try {
		console.log(`Running on http://${HOST}:${PORT}`);
		await resetStorage();
	} catch (ex) {
		const err = `Failed to reset storage,Error:${ex}`;
		console.error(err);
		process.exit(1);
	}
});

export default app;
