import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { Booking } from '../../../domain/booking/model';
import { messageProducerSNS } from '../producer/producer.sns.service';

@Injectable()
export class AirPlaneTicketCommands {
	constructor(
		private dataServices: IDataServices,
		private producer: messageProducerSNS,
	) {}

	@OnEvent('booking.created')
	async handleFlightCreatedEvent(payload: Booking) {
		//changing status
		const ticket = await this.dataServices.airPlaneTicket.get(
			payload.airPlaneTicket,
		);

		if (!ticket) {
			throw new Error('unable to get the ticket');
		} else {
			// checking status
			ticket.status = 'booked';
		}

		this.producer.sendMessage(
			{
				id: payload.id,
				body: {
					booking: payload,
					ticket,
					event: 'ReservaCreada',
				},
			},
			'arn:aws:sns:us-east-1:191300708619:ReservaCreada',
		);

		await this.dataServices.airPlaneTicket.update(
			payload.airPlaneTicket,
			ticket,
		);
	}
	@OnEvent('booking.canceled')
	async handleFlightCanceledEvent(id: string) {
		//changing status
		const booking = await this.dataServices.booking.get(id);

		if (!booking) {
			throw new Error('unable to get the booking');
		}

		this.producer.sendMessage(
			{
				id: booking.id,
				body: {
					booking,
					event: 'ReservaCancelada',
				},
			},
			'arn:aws:sns:us-east-1:191300708619:ReservaCancelada',
		);
	}
}
