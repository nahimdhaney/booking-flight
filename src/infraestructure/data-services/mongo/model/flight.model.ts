import { v4 as uuid } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FlightNumber } from '../../../../shared/ValueObjects/flightNumber';
import { FlightTime } from '../../../../shared/ValueObjects/flightTime';
@Schema()
export class Flight {
	@Prop({ required: true, unique: true })
	id: uuid;

	@Prop()
	destinyId: uuid;

	@Prop()
	originId: uuid;

	@Prop()
	flightNumber: FlightNumber;

	// @Prop()
	// departureTime:Date;

	// @Prop()
	// arrivalTime:Date;

	@Prop()
	flightTime: FlightTime;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
