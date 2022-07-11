import { BusinessRule } from '../Core/businessRule';

export class OnlyValues implements BusinessRule {
	data: string;
	acceptedValues: Array<string>;
	message: string;

	constructor(data: string, acceptedValues: Array<string>) {
		this.data = data;
		this.acceptedValues = acceptedValues;

		this.message = `Only Accept this values: ${acceptedValues.toString()} digits`;
	}

	//if true, error
	validate(): boolean {
		return !this.acceptedValues.includes(this.data);
	}
}
