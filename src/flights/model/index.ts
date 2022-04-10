import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { DomainEvent } from 'src/shared/core/domainEvent';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';

export class Flight extends AggregateRoot<uuid> {
  id;
  destinyId: uuid;
  originId: uuid;
  flightNumber: FlightNumber; 
  crew; // should be a class
  departTime: Date;
  arrivalTime: Date;

  constructor(
    destinyId: uuid,
    originId: uuid,
    flightNumber: FlightNumber,
    crew,
    id,
    departTime: Date,
    arrivalTime: Date,
  ) {
    super();
    this.destinyId = destinyId;
    this.originId = originId;
    this.flightNumber = flightNumber;
    this.crew = crew;
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.departTime = departTime;
    this.id = uuid();
  }

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
