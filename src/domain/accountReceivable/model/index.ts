import { v4 as uuid } from 'uuid';
import { Entity } from 'src/shared/core/entity';
import { Amount } from 'src/shared/ValueObjects/amount';

export class AccountReceivable extends Entity<uuid>  {
  
  id;
  originalValue: Amount;
  currentValue: Amount;

  constructor(
    amount: Amount,
  ) {
    super();
    this.id = uuid();
    this.originalValue=amount;
    this.currentValue=this.originalValue;
  }

}
