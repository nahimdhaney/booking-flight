import { AirPlaneTicket } from '../../domain/airplaneTicket/model';
import { Booking } from '../../domain/booking/model';
import { Flight } from '../../domain/flight/model';
import { Passanger } from '../../domain/passanger/model';
import { Payment } from '../../domain/payment/model';
import { IGenericRepository } from '../../shared/Core/iRepository';

export abstract class IDataServices {
	abstract airPlaneTicket: IGenericRepository<AirPlaneTicket>;

	abstract flight: IGenericRepository<Flight>;

	abstract booking: IGenericRepository<Booking>;

	abstract passanger: IGenericRepository<Passanger>;

	abstract payment: IGenericRepository<Payment>;
}
