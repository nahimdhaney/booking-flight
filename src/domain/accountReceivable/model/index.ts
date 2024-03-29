import { v4 as uuid } from 'uuid';
import { Entity } from '../../../shared/Core/entity';
import { Amount } from '../../../shared/ValueObjects/amount';
// import { Amount } from 'shared/ValueObjects/amount';
// import { Entity } from 'shared/Core/entity';

export class AccountReceivable extends Entity<uuid> {
	id;
	originalValue: Amount;
	currentValue: Amount;

	constructor(amount: Amount) {
		super();
		this.id = uuid();
		this.originalValue = amount;
		this.currentValue = this.originalValue;
	}
}
