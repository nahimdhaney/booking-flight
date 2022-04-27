import { v4 as uuid } from 'uuid';
import { AirPlaneTicket } from 'src/domain/airplaneTicket/model';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { Seat } from 'src/shared/ValueObjects/seat';
import { Price } from 'src/shared/ValueObjects/price';

export class Flight extends AggregateRoot<uuid> {
  id;
  destinyId: uuid;
  originId: uuid;
  flightNumber: FlightNumber; 
  flightTime: FlightTime;
  tickets: Array<AirPlaneTicket>;
  AirPlaneTicket
  
  crew; // should be a class

  constructor(
    destinyId?: uuid,
    originId?: uuid,
    flightNumber?: FlightNumber,
    crew?,
    id?,
    flightTime?: FlightTime,
  ) {
    super();
    this.destinyId = destinyId;
    this.originId = originId;
    this.flightNumber = flightNumber;
    this.crew = crew;
    this.id = id;
    this.flightTime = flightTime; 
    this.id = uuid();
    this.tickets = [];
    this.generateAirplaneTickets("","");
  }

  public toEntity(){
    
  }

  public generateAirplaneTickets(quant,price){
      this.tickets.push(new AirPlaneTicket(new Seat('2A'),new Price(20)));
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
