
import { AirPlaneTicket } from "src/domain/airplaneTicket/model";
import { Flight } from "src/domain/flight/model";
import { IGenericRepository } from "src/shared/Core/iRepository";

export abstract class IDataServices {

  abstract airPlaneTicket : IGenericRepository<AirPlaneTicket>;

  abstract flight : IGenericRepository<Flight>;
    
}
