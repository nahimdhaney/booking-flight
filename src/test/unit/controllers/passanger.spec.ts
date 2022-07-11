import { Test } from '@nestjs/testing';
import { PassangerServices } from 'src/application/useCases/passanger';
import { PassangerController } from 'src/controllers';

describe('PassangerController', () => {
	let passangerController: PassangerController;
	let passangerService: PassangerServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				PassangerController,
				{
					provide: PassangerServices,
					useFactory: () => ({
						getAllPassangers: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		passangerController = module.get<PassangerController>(PassangerController);
		passangerService = module.get<PassangerServices>(PassangerServices);
	});

	describe('findAll', () => {
		it('should return an array of passanger', async () => {
			const result = [];
			jest
				.spyOn(passangerService, 'getAllPassangers')
				.mockImplementation(async () => []);
			expect(await passangerController.getAll()).toStrictEqual(result);
		});
	});
});
