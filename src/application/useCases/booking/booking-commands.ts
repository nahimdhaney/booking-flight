import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { Payment } from 'src/domain/payment/model';
import { Amount } from 'src/shared/ValueObjects/amount';
import { ReservationStatus } from 'src/shared/ValueObjects/reservationStatus';

@Injectable()
export class BookingCommands {
	constructor(
		private dataServices: IDataServices,
		private eventEmitter: EventEmitter2,
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

		if (resultingAmount == 0) {
			this.eventEmitter.emit('payment.completed', payload.booking);

			bookingToUpdate.reservationStatus = new ReservationStatus(
				'completed',
			);
		} else {
			bookingToUpdate.reservationStatus = new ReservationStatus(
				'parcially-payed',
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
