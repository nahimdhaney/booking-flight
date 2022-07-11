import { IDataServices } from 'src/application/abstracts/data-services.abstract';

import { OnEvent } from '@nestjs/event-emitter';
import { Booking } from 'src/domain/booking/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AirPlaneTicketCommands {
	constructor(private dataServices: IDataServices) {}

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

		await this.dataServices.airPlaneTicket.update(
			payload.airPlaneTicket,
			ticket,
		);
	}
}
