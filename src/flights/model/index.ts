import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';

export class Flight extends AggregateRoot<uuid> {
  id;
  destinyId: uuid;
  originId: uuid;
  flightNumber: FlightNumber; 
  flightTime: FlightTime;
  crew; // should be a class

  constructor(
    destinyId: uuid,
    originId: uuid,
    flightNumber: FlightNumber,
    crew,
    id,
    flightTime: FlightTime,
  ) {
    super();
    this.destinyId = destinyId;
    this.originId = originId;
    this.flightNumber = flightNumber;
    this.crew = crew;
    this.id = id;
    this.flightTime = flightTime; 
    this.id = uuid();
  }


  public Add

  public beforeCreate() {
    // validate aircraft is free
    // validate origin and destiny
    // create lista (report)
  }

  public afterCreate() {
    // const event: DomainEvent = {
    //   name: 'after_create_flight',
    //   createdAt: new Date(),
    //   id: uuid.create(),
    // };
    // this.addDomainEvent(event);
  }
}
