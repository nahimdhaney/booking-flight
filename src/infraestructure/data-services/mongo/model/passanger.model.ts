import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type PassangerDocument = Passanger & Document;

@Schema()
export class Passanger {
	@Prop({ required: true })
	id: uuid;

	@Prop()
	name: string;

	@Prop()
	lastName: string;

	@Prop()
	passport: string;
}

export const PassangerSchema = SchemaFactory.createForClass(Passanger);
