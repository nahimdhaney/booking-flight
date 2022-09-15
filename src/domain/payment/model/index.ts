import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '../../../shared/Core/aggregateRoot';
import { Amount } from '../../../shared/ValueObjects/amount';
import { TransactionNumber } from '../../../shared/ValueObjects/transactionNumber';

export class Payment extends AggregateRoot<uuid> {
	id: uuid;
	transactionNumber: TransactionNumber;
	amount: Amount;
	booking: uuid;

	constructor(
		transactionNumber?: TransactionNumber,
		booking?: uuid,
		amount?: Amount,
	) {
		super();
		this.id = uuid();
		this.transactionNumber = transactionNumber;
		this.booking = booking;
		this.amount = amount;
	}
}
