import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { Seat } from 'src/shared/ValueObjects/seat';
import { Price } from 'src/shared/ValueObjects/price';

export class AirPlaneTicket extends AggregateRoot<uuid> {
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

  public beforeCreate() {
  }

  public afterCreate() {
  }
}
