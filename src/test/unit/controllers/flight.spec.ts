import { Test } from '@nestjs/testing';
import { FlightServices } from '../../../application/useCases/flight';
import { FlightController } from '../../../controllers';

describe('FlightController', () => {
	let flightController: FlightController;
	let flightService: FlightServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				FlightController,
				{
					provide: FlightServices,
					useFactory: () => ({
						getAllFlights: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		flightController = module.get<FlightController>(FlightController);
		flightService = module.get<FlightServices>(FlightServices);
	});

	describe('findAll', () => {
		it('should return an array of flight', async () => {
			const result = [];
			jest.spyOn(flightService, 'getAllFlights').mockImplementation(
				async () => [],
			);
			expect(await flightController.getAll()).toStrictEqual(result);
		});
	});
});
