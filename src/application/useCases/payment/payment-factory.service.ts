import { Injectable } from '@nestjs/common';
// import { PaymentDto, UpdatePaymentDto } from 'application/dto/payment.dto';
// import { Payment } from 'domain/payment/model';
// import { Amount } from 'shared/ValueObjects/amount';
// import { TransactionNumber } from 'shared/ValueObjects/transactionNumber';
import { v4 as uuid } from 'uuid';
import { Payment } from '../../../domain/payment/model';
import { Amount } from '../../../shared/ValueObjects/amount';
import { TransactionNumber } from '../../../shared/ValueObjects/transactionNumber';
import { PaymentDto, UpdatePaymentDto } from '../../dto/payment.dto';

@Injectable()
export class PaymentFactoryService {
	createNewPayment(createpaymentDto: PaymentDto) {
		const transactionNumber = new TransactionNumber(
			createpaymentDto.transactionNumber,
		);
		const amount = new Amount(createpaymentDto.amount);

		const passangerToInsert = new Payment(
			transactionNumber,
			createpaymentDto.booking,
			amount,
		);

		return passangerToInsert;
	}

	updatePayment(updatepaymentDto: UpdatePaymentDto) {
		const newPayment = new Payment();

		return newPayment;
	}
}
