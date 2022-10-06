import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { IDataServices } from '../../../application/abstracts/data-services.abstract';
import {
	BookingCommands,
	BookingServices,
} from '../../../application/useCases/booking';
import { messageProducerSNS } from '../../../application/useCases/producer/producer.sns.service';
import { AccountReceivable } from '../../../domain/accountReceivable/model';
import { Booking } from '../../../domain/booking/model';
import { Payment } from '../../../domain/payment/model';
import { Amount } from '../../../shared/ValueObjects/amount';
import { ReservationNumber } from '../../../shared/ValueObjects/reservationNumber';
import { ReservationStatus } from '../../../shared/ValueObjects/reservationStatus';

describe('BookingCommand Test', () => {
	let dataServices: IDataServices;
	let bookingServices: BookingServices;
	let bookingCommands: BookingCommands;
	//   let eventEmitter; event
	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				BookingCommands,
				{
					provide: IDataServices,
					useFactory: () => ({
						booking: {
							get: jest.fn(() => true),
							update: jest.fn(() => true),
						},
					}),
				},
				EventEmitter2,
				{
					provide: messageProducerSNS,
					useFactory: () => ({
						sendMessage: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		dataServices = module.get<IDataServices>(IDataServices);
		bookingCommands = module.get<BookingCommands>(BookingCommands);
	});

	it('payment.created', async () => {
		const payment = new Payment();
		payment.amount = new Amount(30);

		const booking = new Booking(
			new ReservationNumber('12345678'),
			'airplaneTicket-uuid',
			'flight-uuid',
			'passanger-uuid',
			new ReservationStatus('open'),
			new Date('2022-05-25'),
			new AccountReceivable(new Amount(100)),
		);

		jest.spyOn(dataServices.booking, 'get').mockImplementation(
			async () => booking,
		);
		jest.spyOn(dataServices.booking, 'update');
		await bookingCommands.handlePaymentCreatedEvent(payment);
		expect(dataServices.booking.get).toBeCalled();
		expect(dataServices.booking.update).toBeCalled();
	});

	//   it('Should insert a booking with one', async () => {

	//     const bookingDto = new CreateBookingDto()
	//     bookingDto.airPlaneTicket = 'uid',
	//     bookingDto.date = new Date();
	//     bookingDto.flight = 'uid';
	//     bookingDto.passanger = 'uid-passanger';
	//     bookingDto.reservationNumber = '12345';
	//     bookingDto.value = 12
	//     await bookingServices.createBooking(bookingDto);
	//     jest.spyOn(dataServices.booking, 'create')

	//     expect(dataServices.booking.create).toBeCalled()

	//   });
});
