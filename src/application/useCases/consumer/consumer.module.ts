import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { config } from '../../../configuration';
import { FlightServicesModule } from '../flight';
import { PassangerServicesModule } from '../passanger';
import { PaymentServicesModule } from '../payment';
import { BookingServicesModule } from '../booking';

AWS.config.update({
	region: config.AWS_REGION, // aws region
	accessKeyId: config.ACCESS_KEY_ID, // aws access key id
	secretAccessKey: config.SECRET_ACCESS_KEY, // aws secret access key
});
@Module({
	imports: [
		SqsModule.register({
			consumers: [
				{
					name: 'Flights_booking', //  config.TEST_QUEUE, // name of the queue
					queueUrl:
						'https://sqs.us-east-1.amazonaws.com/191300708619/Flights_booking', // the url of the queue
					region: config.AWS_REGION,
				},
			],
			producers: [],
		}),
		FlightServicesModule,
		PassangerServicesModule,
		PaymentServicesModule,
		BookingServicesModule,
	],
	controllers: [],
	providers: [MessageHandler],
})
export class ConsumerModule {}
