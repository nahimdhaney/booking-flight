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
	@SqsMessageHandler(config.TEST_QUEUE, false)
	async handleMessage(message: AWS.SQS.Message) {
		const obj: any = JSON.parse(message.Body);
		const data = obj;

		// VueloCreado
		// if (data.event && data.event === 'PasajeroCreado' ){
		// 	this.passangerService.createPassanger(data.passanger)
		// }
		// if (data.event && data.event === 'ReservaCreada' ){
		// 	this.bookingService.createBooking(data.flight)
		// }
		if (data.event && data.event === 'VueloCreado') {
			this.flightServices.createFlight(data.flight);
		}
		// if (data.event && data.event === 'ReservaPagada' ){
		// 	this.flightServices.createFlight(data.flight)
		// }
		// ReservaCreada
		// ReservaPago
		// ReservaPagada
		// ReservaCancelada

		console.log(data);
		// use the data and consume it the way you want //
	}
}
