import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import * as mongoose from 'mongoose';
import { ReservationNumber } from 'src/shared/ValueObjects/reservationNumber';
import { ReservationStatus } from 'src/shared/ValueObjects/ReservationStatus';
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
  airPlane: uuid;

  @Prop()
  passanger: uuid;

  @Prop()
  reservationStatus: ReservationStatus;

  @Prop()
  date: Date;
  
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
