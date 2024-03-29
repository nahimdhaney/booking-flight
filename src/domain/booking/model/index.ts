import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '../../../shared/Core/aggregateRoot';
import { ReservationNumber } from '../../../shared/ValueObjects/reservationNumber';
import { ReservationStatus } from '../../../shared/ValueObjects/reservationStatus';
import { AccountReceivable } from '../../accountReceivable/model';

export class Booking extends AggregateRoot<uuid> {
	id: uuid;
	reservationNumber: ReservationNumber;
	airPlaneTicket: uuid;
	flight: uuid;
	passanger: uuid;
	reservationStatus: ReservationStatus;
	date: Date;
	accountReceivable: AccountReceivable;
	constructor(
		reservationNumber?: ReservationNumber,
		airPlaneTicket?: uuid,
		flight?: uuid,
		passanger?: uuid,
		status?: ReservationStatus,
		date?: Date,
		accountReceivable?: AccountReceivable,
	) {
		super();
		this.id = uuid();
		this.reservationNumber = reservationNumber;
		this.airPlaneTicket = airPlaneTicket;
		this.flight = flight;
		this.passanger = passanger;
		this.reservationStatus = status;
		this.date = date;
		this.accountReceivable = accountReceivable;
	}

	/**
	 * completeBooking
	 */
	//  public completeBooking() {
	//     let event = new bookingCreated(this.reservationNumber);
	//     // this.addDomainEvent(event)
	//  }
}
