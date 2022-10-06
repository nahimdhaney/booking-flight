import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../../../configuration';
import { BookingServices } from '../booking';
import { FlightServices } from '../flight';
import { PassangerServices } from '../passanger';
import { PaymentServices } from '../payment';

console.log('config.AWS_REGION', config);
@Injectable()
export class MessageHandler {
	constructor(
		private flightServices: FlightServices,
		private passangerService: PassangerServices,
		private bookingService: BookingServices,
		private paymentService: PaymentServices,
	) {
		/* TODO document why this constructor is empty */
	}
	@SqsMessageHandler('nahim_booking', false)
	async handleMessage(message: AWS.SQS.Message) {
		const obj: any = JSON.parse(message.Body);
		const data = obj;

		if (data.event && data.event === 'FlightCreated') {
			const flight: any = {
				destinyId: data.flight.source_airport_code,
				originId: data.flight.destiny_airport_code,
				flightNumber: data.flight.id + '',
				departureTime: data.flight.startTime,
				arrivalTime: data.flight.endTime,
				flightTime: data.flight.startTime,
				tickets: data.information.tickets,
			};

			this.flightServices.createFlight(flight);
		}

		console.log(data);
		// use the data and consume it the way you want //
	}
}
