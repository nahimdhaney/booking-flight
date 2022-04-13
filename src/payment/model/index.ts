import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { TransactionNumber } from 'src/shared/ValueObjects/transactionNumber';
import { Amount } from 'src/shared/ValueObjects/amount';

export class Payment extends AggregateRoot<uuid> {
  id:uuid;
  transactionNumber: TransactionNumber;
  amount: Amount;
  booking: uuid;
  constructor(
    transactionNumber: TransactionNumber,
    booking: uuid,
    amount: Amount,
    ) {
    super();
    this.id = uuid();
    this.transactionNumber= transactionNumber;
    this.booking = booking;
    this.amount = amount;
  }

}
