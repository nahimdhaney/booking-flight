import { Test } from '@nestjs/testing';

// import {
// 	FlightFactoryService,
// 	FlightServices,
// } from 'application/useCases/flight';
// import { IDataServices } from 'application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDataServices } from '../../../application/abstracts/data-services.abstract';
import {
	FlightFactoryService,
	FlightServices,
} from '../../../application/useCases/flight';
import { FlightNumber } from '../../../shared/ValueObjects/flightNumber';
import { FlightTime } from '../../../shared/ValueObjects/flightTime';
import { RowTicketDto } from '../../../application/dto/rowTicket.dto';
import { FlightDto } from '../../../application/dto/flight.dto';
import { Flight } from '../../../domain/flight/model';
import { messageProducerSNS } from '../../../application/useCases/producer/producer.sns.service';
// import { MessageProducer } from '../../../application/useCases/producer/producer.service';
// import { Flight } from 'domain/flight/model';
// import { FlightNumber } from 'shared/ValueObjects/flightNumber';
// import { FlightTime } from 'shared/ValueObjects/flightTime';
// import { FlightDto } from 'application/dto/flight.dto';
// import { AirPlaneTicket } from 'domain/airplaneTicket/model';
// import { RowTicketDto } from 'application/dto/rowTicket.dto';

describe('FlightsUseCases Test', () => {
	let dataServices: IDataServices;
	let flightFactoryService: FlightFactoryService;
	let eventEmitter: EventEmitter2;
	let flightServices: FlightServices;
	let messageProducer: messageProducerSNS;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				FlightServices,
				{
					provide: IDataServices,
					useFactory: () => ({
						flight: {
							get: jest.fn(() => false),
							getAll: jest.fn(() => true),
							create: jest.fn(() => true),
						},
						airPlaneTicket: {
							create: jest.fn(() => true),
						},
					}),
				},
				{
					provide: EventEmitter2,
					useFactory: () => ({
						emit: jest.fn(() => true),
					}),
				},
				// {
				// 	provide: messageProducerSNS,
				// 	useFactory: () => ({
				// 		sendMessage: jest.fn(() => true),
				// 	}),
				// },
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
		let rowTicketDtos = new Array<RowTicketDto>();

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
