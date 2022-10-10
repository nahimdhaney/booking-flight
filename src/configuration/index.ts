export const config = {
	mongoConnectionString: process.env
		.CLEAN_NEST_MONGO_CONNECTION_STRING as string,
	AWS_REGION: process.env.AWS_REGION as string,
	ACCESS_KEY_ID: process.env.ACCESS_KEY_ID as string,
	SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY as string,
	SNS_ARN: process.env.SNS_ARN as string,
	TEST_QUEUE: process.env.TEST_QUEUE as string,
	TEST_QUEUE_URL: process.env.TEST_QUEUE_URL as string,
};
