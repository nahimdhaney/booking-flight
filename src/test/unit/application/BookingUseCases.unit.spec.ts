import { Test } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDataServices } from '../../../application/abstracts/data-services.abstract';
import {
	BookingFactoryService,
	BookingServices,
} from '../../../application/useCases/booking';
import { AirPlaneTicketCommands } from '../../../application/useCases/airPlaneTicket';
import { Booking } from '../../../domain/booking/model';
import { ReservationNumber } from '../../../shared/ValueObjects/reservationNumber';
import { ReservationStatus } from '../../../shared/ValueObjects/reservationStatus';
import { AccountReceivable } from '../../../domain/accountReceivable/model';
import { Amount } from '../../../shared/ValueObjects/amount';
import { CreateBookingDto } from '../../../application/dto/booking.dto';

describe('BookingsUseCases Test', () => {
	let dataServices: IDataServices;
	let bookingFactoryService: BookingFactoryService;
	let eventEmitter: EventEmitter2;
	let bookingServices: BookingServices;
	let airplaneTicket: AirPlaneTicketCommands;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				BookingServices,
				{
					provide: IDataServices,
					useFactory: () => ({
						booking: {
							getAll: jest.fn(() => true),
							create: jest.fn(() => true),
						},
					}),
				},
				{
					provide: BookingFactoryService,
					useFactory: () => ({
						createNewBooking: jest.fn(() => true),
					}),
				},
				EventEmitter2,
				AirPlaneTicketCommands,
			],
		}).compile();

		dataServices = module.get<IDataServices>(IDataServices);
		bookingServices = module.get<BookingServices>(BookingServices);
		eventEmitter = module.get<EventEmitter2>(EventEmitter2);
		bookingFactoryService = module.get<BookingFactoryService>(
			BookingFactoryService,
		);
		airplaneTicket = module.get<AirPlaneTicketCommands>(
			AirPlaneTicketCommands,
		);
	});

	it('shoud return an empty list of Bookings', async () => {
		jest.spyOn(bookingServices, 'getAllBookings').mockImplementation(
			async () => [],
		);
		const bookings = await bookingServices.getAllBookings();
		expect(bookings).toHaveLength(0);
	});

	it('Should return an list of Bookings with one', async () => {
		const booking = new Booking(
			new ReservationNumber('12345678'),
			'airplaneTicket-uuid',
			'flight-uuid',
			'passanger-uuid',
			new ReservationStatus('open'),
			new Date('2022-05-25'),
			new AccountReceivable(new Amount(100)),
		);

		jest.spyOn(bookingServices, 'getAllBookings').mockImplementation(
			async () => [booking],
		);

		const bookings = await bookingServices.getAllBookings();
		expect(bookings).toHaveLength(1);
		expect(bookings[0]).toBeInstanceOf(Booking);
	});

	it('Should insert a booking with one', async () => {
		const bookingDto = new CreateBookingDto();
		(bookingDto.airPlaneTicket = 'uid'), (bookingDto.date = new Date());
		bookingDto.flight = 'uid';
		bookingDto.passanger = 'uid-passanger';
		bookingDto.reservationNumber = '12345';
		bookingDto.value = 12;
		await bookingServices.createBooking(bookingDto);
		jest.spyOn(dataServices.booking, 'create');

		expect(dataServices.booking.create).toBeCalled();
	});
});
