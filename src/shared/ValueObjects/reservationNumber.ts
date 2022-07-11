import { ValueObject } from '../Core/valueObject';
import { ExactDigits } from '../Rules/exactDigits';

export class ReservationNumber extends ValueObject {
	private readonly data: string;

	constructor(data: string) {
		super();
		this.validate(new ExactDigits(data, 8));
		this.data = data;
	}
}
