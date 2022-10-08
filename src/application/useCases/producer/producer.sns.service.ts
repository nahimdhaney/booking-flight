import { SNS } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class messageProducerSNS {
	async sendMessage(message, topic) {
		await this.uploadSNS(message, topic);
	}

	async uploadSNS(body, topic) {
		const SNS = this.getSNS();
		const message: any = JSON.stringify(body);
		const params = {
			Message: message,
			TopicArn: topic,
		};

		return new Promise((resolve, reject) => {
			SNS.publish(params, (err, data) => {
				if (err) {
					Logger.error(err);
					reject(err.message);
				}
				resolve(data);
			});
		});
	}

	getSNS() {
		return new SNS({ apiVersion: '2010-03-31' });
	}
}
