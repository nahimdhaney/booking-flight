import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Price } from '../../../../shared/ValueObjects/price';
import { Seat } from '../../../../shared/ValueObjects/seat';

export type AirPlaneTicketDocument = AirPlaneTicket & Document;

@Schema()
export class AirPlaneTicket {
	@Prop({ required: true })
	id: uuid;

	@Prop()
	code: Seat;

	@Prop()
	price: Price;

	@Prop()
	flight: uuid;

	@Prop()
	clase: string;

	@Prop()
	status: string;
}

export const AirPlaneTicketSchema =
	SchemaFactory.createForClass(AirPlaneTicket);
