import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '../../../shared/Core/aggregateRoot';
import { FlightNumber } from '../../../shared/ValueObjects/flightNumber';
import { FlightTime } from '../../../shared/ValueObjects/flightTime';

export class Flight extends AggregateRoot<uuid> {
	id;
	destinyId: uuid;
	originId: uuid;
	flightNumber: FlightNumber;
	flightTime: FlightTime;

	constructor(
		destinyId?: uuid,
		originId?: uuid,
		flightNumber?: FlightNumber,
		flightTime?: FlightTime,
	) {
		super();
		this.destinyId = destinyId;
		this.originId = originId;
		this.flightNumber = flightNumber;
		this.flightTime = flightTime;
		this.id = uuid();
	}
}
