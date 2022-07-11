import { BusinessRule } from '../Core/businessRule';

export class ExactDigits implements BusinessRule {
	data: string;
	numberOfDigit: number;
	message: string;

	constructor(data: string, numberOfDigit: number) {
		this.data = data;
		this.numberOfDigit = numberOfDigit;
		this.message = `Must contain ${numberOfDigit} digits`;
	}

	//if true, error
	validate(): boolean {
		return this.data.length !== this.numberOfDigit;
	}
}
