import { v4 as uuid } from 'uuid';
import { Seat } from 'src/shared/ValueObjects/seat';
import { Price } from 'src/shared/ValueObjects/price';
import { Entity } from 'src/shared/core/entity';
import { Number } from 'src/shared/Rules/number';

export class AccountReceivable extends Entity<uuid> {
  id;
  amount: Number;
  status: OnlyValues;
  constructor(
    code: Seat,
    price: Price
  ) {
    super();
    this.id = uuid();
    this.code = code;
    this.price= price;
  }

}
