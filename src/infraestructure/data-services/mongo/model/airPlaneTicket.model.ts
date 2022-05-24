import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Price } from 'src/shared/ValueObjects/price';
import { Seat } from 'src/shared/ValueObjects/seat';

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
  clase:string;

}

export const AirPlaneTicketSchema = SchemaFactory.createForClass(AirPlaneTicket);
