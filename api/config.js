import dotenv from 'dotenv';
dotenv.config();

export const config = {
	PORT: process.env.PORT || 5000,
	HOST: process.env.HOST || '0.0.0.0',
	S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || 'XXXXXXXXXXXXXXXXXXXXXXX',
	S3_SECRET_KEY: process.env.S3_SECRET_KEY || 'XXXXXXXXXXXXXXXXXXXXXXX',
	S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'zappa-aj174h1ci',
	STORE_NAME: process.env.STORE_NAME || 'myLastCreator',
	STORAGE_DIR_NAME: process.env.STORAGE_DIR_NAME || 'tmp',
	EXCEL_OUTPUT_DIR_NAME: process.env.EXCEL_OUTPUT_DIR_NAME || 'csv_tmp',
	MAIL_SERVICE: process.env.MAIL_SERVICE || 'smtp.gmail.com',
	MAIL_USER: process.env.MAIL_USER || 'user@gmail.com',
	MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'XXXXXXXXXXXXXXXXXXXXXXX',
	NODEREST_AUTH_KEY: process.env.NODEREST_AUTH_KEY || 'XXXXXXXXXXXXXXXXXXXXXXX',
};
