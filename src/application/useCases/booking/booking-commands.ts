import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { config } from '../../../configuration';
import { Payment } from '../../../domain/payment/model';
import { Amount } from '../../../shared/ValueObjects/amount';
import { ReservationStatus } from '../../../shared/ValueObjects/reservationStatus';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { messageProducerSNS } from '../producer/producer.sns.service';

@Injectable()
export class BookingCommands {
	constructor(
		private dataServices: IDataServices,
		private eventEmitter: EventEmitter2,
		private producer: messageProducerSNS,
	) {}

	@OnEvent('payment.created')
	async handlePaymentCreatedEvent(payload: Payment) {
		const bookingToUpdate = await this.dataServices.booking.get(
			payload.booking,
		);
		const bookingTicketPrice =
			bookingToUpdate.accountReceivable.currentValue.data;
		const amountPayed = payload.amount.data;

		const resultingAmount = bookingTicketPrice - amountPayed;

		const passanger = await this.dataServices.passanger.get(
			bookingToUpdate.passanger,
		);

		if (resultingAmount == 0) {
			this.eventEmitter.emit('payment.completed', payload.booking);

			bookingToUpdate.reservationStatus = new ReservationStatus(
				'completed',
			);
			this.producer.sendMessage(
				{
					id: payload.id,
					body: {
						payment: payload,
						booking: bookingToUpdate,
						passanger: passanger,
						event: 'ReservaPagada',
					},
				},
				`${config.SNS_ARN}:ReservaPagada`,
			);
		} else {
			bookingToUpdate.reservationStatus = new ReservationStatus(
				'parcially-payed',
			);
			this.producer.sendMessage(
				{
					id: payload.id,
					body: {
						payment: payload,
						booking: bookingToUpdate,
						passanger: passanger,
						event: 'ReservaPago',
					},
				},
				`${config.SNS_ARN}:ReservaPago`,
			);
		}

		bookingToUpdate.accountReceivable.currentValue = new Amount(
			resultingAmount,
		);

		await this.dataServices.booking.update(
			payload.booking,
			bookingToUpdate,
		);
	}
}
