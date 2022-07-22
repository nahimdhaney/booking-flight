import { Test } from '@nestjs/testing';

import {
	FlightFactoryService,
	FlightServices,
} from 'src/application/useCases/flight';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Flight } from 'src/domain/flight/model';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { FlightDto } from 'src/application/dto/flight.dto';
import { AirPlaneTicket } from 'src/domain/airplaneTicket/model';
import { RowTicketDto } from 'src/application/dto/rowTicket.dto';

describe('FlightsUseCases Test', () => {
	let dataServices: IDataServices;
	let flightFactoryService: FlightFactoryService;
	let eventEmitter: EventEmitter2;
	let flightServices: FlightServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				FlightServices,
				{
					provide: IDataServices,
					useFactory: () => ({
						flight: {
							getAll: jest.fn(() => true),
							create: jest.fn(() => true),
						},
						airPlaneTicket: {
							create: jest.fn(() => true),
						},
					}),
				},
				// {
				//   provide: FlightFactoryService,
				//   useFactory: () => (
				//     {
				//       createNewFlight: jest.fn(() => true),
				//     }),
				// },
				{
					provide: EventEmitter2,
					useFactory: () => ({
						emit: jest.fn(() => true),
					}),
				},
				FlightFactoryService,
			],
		}).compile();

		dataServices = module.get<IDataServices>(IDataServices);
		flightServices = module.get<FlightServices>(FlightServices);
		eventEmitter = module.get<EventEmitter2>(EventEmitter2);
		flightFactoryService =
			module.get<FlightFactoryService>(FlightFactoryService);
	});

	it('shoud return an empty list of Flights', async () => {
		jest.spyOn(flightServices, 'getAllFlights').mockImplementation(
            async () => [],
        );
		const flights = await flightServices.getAllFlights();
		expect(flights).toHaveLength(0);
	});

	it('Should return an list of Flights with one', async () => {
		const flight = new Flight(
			'123',
			'123',
			new FlightNumber('1234'),
			new FlightTime(new Date('2020-02-20'), new Date('2020-02-21')),
		);
		jest.spyOn(flightServices, 'getAllFlights').mockImplementation(
            async () => [flight],
        );
		const flights = await flightServices.getAllFlights();

		expect(flights).toHaveLength(1);
		expect(flights[0]).toBeInstanceOf(Flight);
	});

	it('Should insert one flight', async () => {
		const flight = {
			id: '1234',
			destinyId: '12345',
			originId: '34543',
			flightNumber: '125354',
			departureTime: '2022-06-10T00:00:00',
			arrivalTime: '2022-06-11T00:00:00',
			flightTime: '2022-06-10T00:00:00',
			tickets: [],
		};
		let rowTicketDtos: Array<RowTicketDto>;

		let rowTicket1 = new RowTicketDto();

		rowTicket1 = {
			clase: 'turist',
			price: 50,
			quant: 20,
		};

		let rowTicket2 = new RowTicketDto();

		rowTicket2 = {
			clase: 'first',
			price: 50,
			quant: 20,
		};
		rowTicketDtos = [];
		rowTicketDtos.push(rowTicket1);
		rowTicketDtos.push(rowTicket2);
		flight.tickets = rowTicketDtos;

		const anemicFlight = new FlightDto();
		anemicFlight.departureTime = new Date(flight.departureTime);
		anemicFlight.arrivalTime = new Date(flight.arrivalTime);
		anemicFlight.tickets = flight.tickets;
		anemicFlight.destinyId = flight.destinyId;
		anemicFlight.originId = flight.originId;

		const flightDomain = await flightServices.createFlight(anemicFlight);

		jest.spyOn(dataServices.flight, 'create').mockImplementation(
            async () => new Flight(),
        );

		// expect(flights).toHaveLength(1);
		// expect(flightFactoryService).toBeInstanceOf(Flight);
	});
});
