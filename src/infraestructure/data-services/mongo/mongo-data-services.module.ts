import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../../application/abstracts/data-services.abstract';
// import { IDataServices } from '../../../core';
import { config } from '../../../configuration';
import {
	AirPlaneTicket,
	AirPlaneTicketSchema,
	Booking,
	BookingSchema,
	Flight,
	FlightSchema,
	Passanger,
	PassangerSchema,
	Payment,
	PaymentSchema,
} from './model';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Flight.name,
				schema: FlightSchema,
			},
			{
				name: AirPlaneTicket.name,
				schema: AirPlaneTicketSchema,
			},
			{
				name: Booking.name,
				schema: BookingSchema,
			},
			{
				name: Passanger.name,
				schema: PassangerSchema,
			},
			{
				name: Payment.name,
				schema: PaymentSchema,
			},
		]),
		MongooseModule.forRoot(config.mongoConnectionString),
	],
	providers: [
		{
			provide: IDataServices,
			useClass: MongoDataServices,
		},
	],
	exports: [IDataServices],
})
export class MongoDataServicesModule {}
