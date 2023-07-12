import fs from 'fs';
import AWS from 'aws-sdk';
import { config } from '../config';

const s3 = new AWS.S3({
	accessKeyId: config.S3_ACCESS_KEY,
	secretAccessKey: config.S3_SECRET_KEY,
});

export const createBucket = (bucketName) => {
	return new Promise(async (resolve, reject) => {
		try {
			const params = {
				Bucket: bucketName || config.S3_BUCKET_NAME,
				CreateBucketConfiguration: {
					LocationConstraint: 'us-east-1', // Set your region here
				},
			};

			s3.createBucket(params, (err, data) => {
				if (err) {
					console.error(err, err.stack);
					throw err;
				}
				console.log(`Success to create bucket. ${data.Location}`);
				resolve(data.Location);
			});
		} catch (ex) {
			const err = `Failed to create bucket,Error:${ex}`;
			console.error(err);
			reject(err);
		}
	});
};

export const uploadExcelToS3Aws = (pathFile, s3FileName = 'data.xls', bucketName) => {
	return new Promise(async (resolve, reject) => {
		try {
			const fileContent = fs.readFileSync(pathFile);

			const params = {
				Bucket: bucketName || config.S3_BUCKET_NAME,
				Key: s3FileName, // File name you want to save as in S3
				Body: fileContent,
			};

			s3.upload(params, (err, data) => {
				if (err) throw err;
				console.log(`Success to uploaded file. ${data.Location}`);
				resolve(data.Location);
			});
		} catch (ex) {
			const err = `Failed to uploaded file,Error:${ex}`;
			console.error(err);
			reject(err);
		}
	});
};
