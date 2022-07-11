import { ValueObject } from '../Core/valueObject';
import { ExactDigits } from '../Rules/exactDigits';
import { OnlyValues } from '../Rules/onlyValues';

export class ReservationStatus extends ValueObject {
	private readonly data: string;
	constructor(data: string) {
		super();
		this.validate(
			new OnlyValues(data, [
				'open',
				'waiting-for-payment',
				'parcially-payed',
				'completed',
				'canceled',
			]),
		);
		this.data = data;
	}
}
