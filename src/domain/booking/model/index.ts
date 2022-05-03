import { v4 as uuid } from 'uuid';
import { AggregateRoot } from 'src/shared/core/aggregateRoot';
import { ReservationNumber } from 'src/shared/ValueObjects/reservationNumber';
import { ReservationStatus } from 'src/shared/ValueObjects/ReservationStatus';
import { bookingCreated } from '../event/bookingCreated';

export class Booking extends AggregateRoot<uuid> {
  id:uuid;
  reservationNumber: ReservationNumber;
  airPlaneTicket: uuid;
  airPlane: uuid;
  passanger: uuid;
  reservationStatus: ReservationStatus;
  date: Date 
  constructor(
    reservationNumber?: ReservationNumber,
    airPlaneTicket?: uuid,
    airPlane?: uuid,
    passanger?: uuid,  
    status?: ReservationStatus,
    date?: Date
  ) {
    super();
    this.id = uuid();
    this.reservationNumber = reservationNumber;
    this.airPlaneTicket = airPlaneTicket;
    this.airPlane = airPlane;
    this.passanger = passanger; 
    this.reservationStatus= status;
    this.date = date;
    // this.completeBooking();
  }
  
  
 /**
  * completeBooking
  */
//  public completeBooking() {
//     let event = new bookingCreated(this.reservationNumber);
//     // this.addDomainEvent(event)
//  }



}
