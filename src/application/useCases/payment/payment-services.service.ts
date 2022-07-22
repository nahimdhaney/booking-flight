import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { PaymentDto, UpdatePaymentDto } from 'src/application/dto/payment.dto';
import { Payment } from 'src/domain/payment/model';
import { PaymentFactoryService } from './payment-factory.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Booking } from 'src/domain/booking/model';
import { Amount } from 'src/shared/ValueObjects/amount';
import { Console } from 'console';

@Injectable()
export class PaymentServices {
	constructor(
		private dataServices: IDataServices,
		private paymentFactoryService: PaymentFactoryService,
		private eventEmitter: EventEmitter2,
	) {}

	getAllPayments(): Promise<Payment[]> {
		return this.dataServices.payment.getAll();
	}

	async getPaymentById(id: any): Promise<Payment> {
		return this.dataServices.payment.get(id);
	}

	async createPayment(createPaymentDto: PaymentDto): Promise<Payment> {
		// TODO verify saldo
		const booking = await this.dataServices.booking.get(
			createPaymentDto.booking,
		);

		if (!booking) {
			throw new Error('Not booking found');
		}
		const currentValue =
			booking.accountReceivable.currentValue || undefined;

		const paymentvalue = new Amount(createPaymentDto.amount);

		if (currentValue < paymentvalue) {
			throw new Error('Payment is higher than account');
		}

		const payment =
			this.paymentFactoryService.createNewPayment(createPaymentDto);

		const createdPayment = await this.dataServices.payment.create(payment);

		this.eventEmitter.emit('payment.created', createdPayment);

		return createdPayment;
	}

	updatePayment(
		paymentId: string,
		updatePaymentDto: UpdatePaymentDto,
	): Promise<Payment> {
		const payment =
			this.paymentFactoryService.updatePayment(updatePaymentDto);
		return this.dataServices.payment.update(paymentId, payment);
	}
}
