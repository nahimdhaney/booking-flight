import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../../../configuration';

@Injectable()
export class MessageProducer {
	constructor(private readonly sqsService: SqsService) {}
	async sendMessage(body: any) {
		const message: any = JSON.parse(JSON.stringify(body));
		console.log('MessageProducer', message);
		try {
			await this.sqsService.send(config.TEST_QUEUE, message);
		} catch (error) {
			console.log('error in producing image!', error);
		}
	}
}