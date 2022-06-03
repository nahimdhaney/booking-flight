import { Test } from '@nestjs/testing';

import { BookingFactoryService, BookingServices } from 'src/application/useCases/booking';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Booking } from 'src/domain/booking/model';
import { ReservationNumber } from 'src/shared/ValueObjects/reservationNumber';
import { ReservationStatus } from 'src/shared/ValueObjects/ReservationStatus';
import { AccountReceivable } from 'src/domain/accountReceivable/model';
import { Amount } from 'src/shared/ValueObjects/amount';
import { emit } from 'process';
import { EventEmitter } from 'stream';
import { CreateBookingDto } from 'src/application/dto/booking.dto';
import { AirPlaneTicketCommands } from 'src/application/useCases/airPlaneTicket';

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
          useFactory: () => (
            {
              booking: {
                getAll: jest.fn(() => true),
                create: jest.fn(() => true),
              }
            }),
        },
        {
          provide: BookingFactoryService,
          useFactory: () => (
            {
              createNewBooking: jest.fn(() => true),
            }),
        },
        EventEmitter2,
        AirPlaneTicketCommands
      ],
    }).compile();

    dataServices = module.get<IDataServices>(IDataServices);
    bookingServices = module.get<BookingServices>(BookingServices);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    bookingFactoryService = module.get<BookingFactoryService>(BookingFactoryService);
    airplaneTicket = module.get<AirPlaneTicketCommands>(AirPlaneTicketCommands);
  });

  it('shoud return an empty list of Bookings', async () => {

    jest.spyOn(bookingServices, 'getAllBookings').mockImplementation(async () => []);
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
      new AccountReceivable(new Amount(100))
    )

    jest.spyOn(bookingServices, 'getAllBookings').mockImplementation(async () => [booking]);

    const bookings = await bookingServices.getAllBookings();
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toBeInstanceOf(Booking);
  });



  it('Should insert a booking with one', async () => {

    const bookingDto = new CreateBookingDto()
    bookingDto.airPlaneTicket = 'uid',
    bookingDto.date = new Date();
    bookingDto.flight = 'uid';
    bookingDto.passanger = 'uid-passanger';
    bookingDto.reservationNumber = '12345';
    bookingDto.value = 12
    await bookingServices.createBooking(bookingDto);
    jest.spyOn(dataServices.booking, 'create')

    expect(dataServices.booking.create).toBeCalled()

  });




});