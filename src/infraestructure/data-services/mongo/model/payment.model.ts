import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Amount } from '../../../../shared/ValueObjects/amount';
import { TransactionNumber } from '../../../../shared/ValueObjects/transactionNumber';
// import { Price } from 'shared/ValueObjects/price';
// import { Seat } from 'shared/ValueObjects/seat';
// import { TransactionNumber } from 'shared/ValueObjects/transactionNumber';
// import { Amount } from 'shared/ValueObjects/amount';
import { Booking } from './booking.model';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
	@Prop({ required: true })
	id: uuid;

	@Prop()
	transactionNumber: TransactionNumber;

	@Prop()
	amount: Amount;

	@Prop()
	booking: uuid;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
