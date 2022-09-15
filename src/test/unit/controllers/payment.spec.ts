import { Test } from '@nestjs/testing';
import { PaymentServices } from '../../../application/useCases/payment';
import { PaymentController } from '../../../controllers';

describe('PaymentController', () => {
	let paymentController: PaymentController;
	let paymentService: PaymentServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				PaymentController,
				{
					provide: PaymentServices,
					useFactory: () => ({
						getAllPayments: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		paymentController = module.get<PaymentController>(PaymentController);
		paymentService = module.get<PaymentServices>(PaymentServices);
	});

	describe('findAll', () => {
		it('should return an array of payment', async () => {
			const result = [];
			jest.spyOn(paymentService, 'getAllPayments').mockImplementation(
				async () => [],
			);
			expect(await paymentController.getAll()).toStrictEqual(result);
		});
	});
});
