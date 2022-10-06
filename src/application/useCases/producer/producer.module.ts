import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import * as AWS from 'aws-sdk';
import { config } from '../../../configuration';
import { messageProducerSNS } from './producer.sns.service';

AWS.config.update({
	region: config.AWS_REGION, // aws region
	accessKeyId: config.ACCESS_KEY_ID, // aws access key id
	secretAccessKey: config.SECRET_ACCESS_KEY, // aws secret access key
});

@Module({
	imports: [
		SqsModule.register({
			consumers: [],
			producers: [
				{
					name: config.TEST_QUEUE, // name of the queue
					queueUrl: config.TEST_QUEUE_URL,
					region: config.AWS_REGION, // url of the queue
				},
				{
					name: 'passengers_queue', // name of the queue
					queueUrl:
						'https://sqs.us-east-1.amazonaws.com/191300708619/passengers_queue',
					region: config.AWS_REGION, // url of the queue
				},
			],
		}),
	],
	controllers: [],
	providers: [MessageProducer, messageProducerSNS],
	exports: [MessageProducer, messageProducerSNS],
})
export class ProducerModule {}
