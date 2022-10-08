import { Test } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDataServices } from '../../../application/abstracts/data-services.abstract';
import {
	PaymentFactoryService,
	PaymentServices,
} from '../../../application/useCases/payment';
import { Payment } from '../../../domain/payment/model';
import { TransactionNumber } from '../../../shared/ValueObjects/transactionNumber';
import { Amount } from '../../../shared/ValueObjects/amount';
import { messageProducerSNS } from '../../../application/useCases/producer/producer.sns.service';
// import { MessageProducer } from '../../../application/useCases/producer/producer.service';

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
				{
					provide: messageProducerSNS,
					useFactory: () => ({
						sendMessage: jest.fn(() => true),
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
