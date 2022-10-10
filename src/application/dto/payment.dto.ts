import { PartialType } from '@nestjs/mapped-types';

import { v4 as uuid } from 'uuid';

export class PaymentDto {
	transactionNumber: number;
	amount: number;
	booking: uuid;
	date: Date;
}

export class UpdatePaymentDto extends PartialType(PaymentDto) {}
