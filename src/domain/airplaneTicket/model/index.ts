import { v4 as uuid } from 'uuid';
import { Seat } from 'src/shared/ValueObjects/seat';
import { Price } from 'src/shared/ValueObjects/price';
import { Entity } from 'src/shared/core/entity';

export class AirPlaneTicket extends Entity<uuid> {
  id;
  code: Seat ;
  price: Price;
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
