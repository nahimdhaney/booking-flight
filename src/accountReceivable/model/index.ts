import { v4 as uuid } from 'uuid';
import { Seat } from 'src/shared/ValueObjects/seat';
import { Price } from 'src/shared/ValueObjects/price';
import { Entity } from 'src/shared/core/entity';
import { Number } from 'src/shared/Rules/number';

export class AccountReceivable extends Entity<uuid> {
  id;
  originalValue: Number;
  currentValue: Number;
  constructor(
    amount: Number,
  ) {
    super();
    this.id = uuid();
    this.originalValue=amount;
    this.currentValue=this.originalValue;
  }

}
