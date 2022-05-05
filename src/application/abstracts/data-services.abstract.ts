
import { AirPlaneTicket } from "src/domain/airplaneTicket/model";
import { Booking } from "src/domain/booking/model";
import { Flight } from "src/domain/flight/model";
import { Passanger } from "src/domain/passanger/model";
import { Payment } from "src/domain/payment/model";

import { IGenericRepository } from "src/shared/Core/iRepository";

export abstract class IDataServices {

  abstract airPlaneTicket : IGenericRepository<AirPlaneTicket>;

  abstract flight : IGenericRepository<Flight>;
    
  abstract booking : IGenericRepository<Booking>;

  abstract passanger : IGenericRepository<Passanger>;

  abstract payment : IGenericRepository<Payment>;

}
