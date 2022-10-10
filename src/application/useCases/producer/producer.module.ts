import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { config } from '../../../configuration';
import { messageProducerSNS } from './producer.sns.service';

AWS.config.update({
	region: config.AWS_REGION, // aws region
	accessKeyId: config.ACCESS_KEY_ID, // aws access key id
	secretAccessKey: config.SECRET_ACCESS_KEY, // aws secret access key
});

@Module({
	imports: [],
	controllers: [],
	providers: [messageProducerSNS],
	exports: [messageProducerSNS],
})
export class ProducerModule {}
