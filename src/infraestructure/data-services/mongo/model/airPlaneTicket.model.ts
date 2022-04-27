import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Flight } from './';

export type AirPlaneTicketDocument = AirPlaneTicket & Document;

@Schema()
export class AirPlaneTicket {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true })
  flight: Flight;

  @Prop()
  price: number;

}

export const AirPlaneTicketSchema = SchemaFactory.createForClass(AirPlaneTicket);
