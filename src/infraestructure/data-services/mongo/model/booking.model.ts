import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { AccountReceivable } from '../../../../domain/accountReceivable/model';
import { ReservationNumber } from '../../../../shared/ValueObjects/reservationNumber';
import { ReservationStatus } from '../../../../shared/ValueObjects/reservationStatus';
// import { Author, Genre } from './';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
	@Prop({ required: true, unique: true })
	id: uuid;

	@Prop()
	reservationNumber: ReservationNumber;

	@Prop()
	airPlaneTicket: uuid;

	@Prop()
	flight: uuid;

	@Prop()
	passanger: uuid;

	@Prop()
	reservationStatus: ReservationStatus;

	@Prop()
	date: Date;

	@Prop()
	accountReceivable: AccountReceivable;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
