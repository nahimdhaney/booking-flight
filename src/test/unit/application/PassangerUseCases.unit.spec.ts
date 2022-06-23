import { Test } from '@nestjs/testing';

import { PassangerFactoryService, PassangerServices } from 'src/application/useCases/passanger';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Passanger } from 'src/domain/passanger/model';


describe('PassangerUseCases Test', () => {
  let dataServices: IDataServices;
  let passangerFactoryService: PassangerFactoryService;
  let eventEmitter: EventEmitter2;
  let passangerServices: PassangerServices;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PassangerServices,
        {
          provide: IDataServices,
          useFactory: () => (
            {
              passanger: {
                getAll: jest.fn(() => true),
              }
            }),
        },
        {
          provide: PassangerFactoryService,
          useFactory: () => (
            {
              createNewPassanger: jest.fn(() => true),
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
    passangerServices = module.get<PassangerServices>(PassangerServices);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    passangerFactoryService = module.get<PassangerFactoryService>(PassangerFactoryService);

  });

  it('shoud return an empty list of Passangers', async () => {

    jest.spyOn(passangerServices, 'getAllPassangers').mockImplementation(async () => []);
    const passangers = await passangerServices.getAllPassangers();
    expect(passangers).toHaveLength(0);

  });

  it('Should return an list of Passangers with one', async () => {

    const passanger = new Passanger(
      'Nahim',
      'Terrazas',
      '9020353SC'
    )

    jest.spyOn(passangerServices, 'getAllPassangers').mockImplementation(async () => [passanger]);

    const passangers = await passangerServices.getAllPassangers();
    expect(passangers).toHaveLength(1);
    expect(passangers[0]).toBeInstanceOf(Passanger);
  });



});