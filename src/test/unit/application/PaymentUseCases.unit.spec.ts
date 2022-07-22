import { Test } from '@nestjs/testing';

import {
	PaymentFactoryService,
	PaymentServices,
} from 'src/application/useCases/payment';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Payment } from 'src/domain/payment/model';
import { TransactionNumber } from 'src/shared/ValueObjects/transactionNumber';
import { Amount } from 'src/shared/ValueObjects/amount';

describe('PaymentUseCases Test', () => {
	let dataServices: IDataServices;
	let paymentFactoryService: PaymentFactoryService;
	let eventEmitter: EventEmitter2;
	let paymentServices: PaymentServices;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				PaymentServices,
				{
					provide: IDataServices,
					useFactory: () => ({
						payment: {
							getAll: jest.fn(() => true),
						},
					}),
				},
				{
					provide: PaymentFactoryService,
					useFactory: () => ({
						createNewPayment: jest.fn(() => true),
					}),
				},
				{
					provide: EventEmitter2,
					useFactory: () => ({
						emit: jest.fn(() => true),
					}),
				},
			],
		}).compile();

		dataServices = module.get<IDataServices>(IDataServices);
		paymentServices = module.get<PaymentServices>(PaymentServices);
		eventEmitter = module.get<EventEmitter2>(EventEmitter2);
		paymentFactoryService = module.get<PaymentFactoryService>(
			PaymentFactoryService,
		);
	});

	it('shoud return an empty list of Payments', async () => {
		jest.spyOn(paymentServices, 'getAllPayments').mockImplementation(
            async () => [],
        );
		const payments = await paymentServices.getAllPayments();
		expect(payments).toHaveLength(0);
	});

	it('Should return an list of Payments with one', async () => {
		const payment = new Payment(
			new TransactionNumber(12345),
			'booking-id',
			new Amount(123),
		);

		jest.spyOn(paymentServices, 'getAllPayments').mockImplementation(
            async () => [payment],
        );

		const payments = await paymentServices.getAllPayments();
		expect(payments).toHaveLength(1);
		expect(payments[0]).toBeInstanceOf(Payment);
	});
});
