import { Test } from '@nestjs/testing';
import { BookingServices } from '../../../application/useCases/booking';
import { BookingController } from '../../../controllers';

describe('BookingController', () => {
	let bookingController: BookingController;
	let bookingService: BookingServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				BookingController,
				{
					provide: BookingServices,
					useFactory: () => ({
						getAllBookings: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		bookingController = module.get<BookingController>(BookingController);
		bookingService = module.get<BookingServices>(BookingServices);
	});

	describe('findAll', () => {
		it('should return an array of booking', async () => {
			const result = [];
			jest.spyOn(bookingService, 'getAllBookings').mockImplementation(
				async () => [],
			);
			expect(await bookingController.getAll()).toStrictEqual(result);
		});
	});
});
