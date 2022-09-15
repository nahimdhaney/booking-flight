import { v4 as uuid } from 'uuid';
import { Entity } from '../../../shared/Core/entity';
import { Price } from '../../../shared/ValueObjects/price';
import { Seat } from '../../../shared/ValueObjects/seat';

export class AirPlaneTicket extends Entity<uuid> {
	id;
	code: Seat;
	price: Price;
	flight: uuid;
	clase: string;
	status: string;

	constructor(
		code: Seat,
		price: Price,
		flight: uuid,
		clase: string,
		status: string,
	) {
		super();
		this.id = uuid();
		this.code = code;
		this.price = price;
		this.flight = flight;
		this.clase = clase;
		this.status = status;
	}
}
