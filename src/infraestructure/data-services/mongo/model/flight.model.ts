import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// import { Author, Genre } from './';

// export type BookDocument = Book & Document;

@Schema()
export class Flight {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  destinyId: string;

  @Prop()
  originId: string;

  @Prop()
  flightNumber:string;

  @Prop()
  departureTime:Date;

  @Prop()
  arrivalTime:Date;
  
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
