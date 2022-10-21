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
		const obj: any = JSON.parse(JSON.parse(message.Body).Message);
		const wrapper = obj;

		if (wrapper.event && wrapper.event === 'FlightCreated') {
			let otherFields;
			if (wrapper.data.flight.scheduledStartTime) {
				otherFields = {
					departureTime: new Date(
						wrapper.data.flight.scheduledStartTime,
					),
					arrivalTime: new Date(wrapper.data.flight.scheduledEndTime),
					flightTime: new Date(
						wrapper.data.flight.scheduledStartTime,
					),
				};
			} else {
				otherFields = {
					departureTime: new Date(wrapper.data.flight.startTime),
					arrivalTime: new Date(wrapper.data.flight.endTime),
					flightTime: new Date(wrapper.data.flight.startTime),
				};
			}
			const flight: any = {
				id: wrapper.data.flight.uuid,
				destinyId: wrapper.data.flight_program.destinyAirport,
				originId: wrapper.data.flight_program.sourceAirport,
				flightNumber: wrapper.data.flight_program.flightCode + '',
				...otherFields,
			};

			this.flightServices.createFlight(flight);
		}

		console.log(wrapper);
		// use the data and consume it the way you want //
	}
}
