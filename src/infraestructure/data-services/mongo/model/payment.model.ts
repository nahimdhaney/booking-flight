import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Price } from 'src/shared/ValueObjects/price';
import { Seat } from 'src/shared/ValueObjects/seat';
import { TransactionNumber } from 'src/shared/ValueObjects/transactionNumber';
import { Amount } from 'src/shared/ValueObjects/amount';
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
