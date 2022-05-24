import { Test } from '@nestjs/testing';

import { FlightFactoryService, FlightServices } from 'src/application/useCases/flight';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Flight } from 'src/domain/flight/model';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';

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
          useFactory: () => (
            {
              flight: {
                getAll: jest.fn(() => true),
              }
            }),
        },
        {
          provide: FlightFactoryService,
          useFactory: () => (
            {
              createNewFlight: jest.fn(() => true),
            }),
        },
        {
          provide: EventEmitter2,
          useFactory: () => (
            {
              emit: jest.fn(() => true),
            }),
        }
      ],
    }).compile();

    dataServices = module.get<IDataServices>(IDataServices);
    flightServices = module.get<FlightServices>(FlightServices);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    flightFactoryService = module.get<FlightFactoryService>(FlightFactoryService);
    
  });

  it('shoud return an empty list of Flights', async () => {

    jest.spyOn(flightServices, 'getAllFlights').mockImplementation(async () => []);
    // jest.spyOn(eventEmitter,'emit')
    const flights = await flightServices.getAllFlights();
    // expect(eventEmitter).last
    expect(flights).toHaveLength(0);

  });

  it('Should return an list of Flights with one', async () => {

    const flight = new Flight('123','123',new FlightNumber('1234'),new FlightTime(new Date('2020-02-20'),new Date('2020-02-21')));
    jest.spyOn(flightServices, 'getAllFlights').mockImplementation(async () => [flight]);
    const flights = await flightServices.getAllFlights();

    expect(flights).toHaveLength(1);
    expect(flights[0]).toBeInstanceOf(Flight);
  });



});