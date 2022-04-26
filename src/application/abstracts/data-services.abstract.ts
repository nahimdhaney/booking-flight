// import { Author, Book, Genre } from '../entities';
// import { IGenericRepository } from './generic-repository.abstract';

import { AccountReceivable } from "src/domain/accountReceivable/model";
import { AirPlaneTicket } from "src/domain/airplaneTicket/model";
import { Booking } from "src/domain/booking/model";
import { Flight } from "src/domain/entities/flight.entity";
// import { Flight } from "src/domain/flight/model";
import { Passanger } from "src/domain/passanger/model";
import { Payment } from "src/domain/payment/model";
import { IGenericRepository } from "src/shared/Core/iRepository";

export abstract class IDataServices {
  // abstract bookings: IGenericRepository<Booking>;

  // abstract accountsReceivable: IGenericRepository<AccountReceivable>;

  // abstract airPlaneTicket : IGenericRepository<AirPlaneTicket>;

  abstract flight : IGenericRepository<Flight>;
    
  // abstract passanger : IGenericRepository<Passanger>;

  // abstract payment : IGenericRepository<Payment>;

}
