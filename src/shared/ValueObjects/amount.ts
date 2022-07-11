import { ValueObject } from '../Core/valueObject';
import { Number } from '../Rules/number';

export class Amount extends ValueObject {
	public readonly data: number;

	constructor(data: number) {
		super();
		this.validate(new Number(data));
		this.data = data;
	}

	getData(): number {
		return this.data;
	}
}
