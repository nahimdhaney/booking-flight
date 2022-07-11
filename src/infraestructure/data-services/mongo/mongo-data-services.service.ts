import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
	Flight,
	AirPlaneTicket,
	AirPlaneTicketDocument,
	Booking,
	BookingDocument,
	Passanger,
	PassangerDocument,
	Payment,
	PaymentDocument,
} from './model';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import mongoose from 'mongoose';

@Injectable()
export class MongoDataServices
	implements IDataServices, OnApplicationBootstrap
{
	flight: MongoGenericRepository<Flight>;
	airPlaneTicket: MongoGenericRepository<AirPlaneTicket>;
	booking: MongoGenericRepository<Booking>;
	passanger: MongoGenericRepository<Passanger>;
	payment: MongoGenericRepository<Payment>;

	constructor(
		@InjectModel(Flight.name)
		private FlightRepository: Model<Flight>,

		@InjectModel(AirPlaneTicket.name)
		private AirplaneRepository: Model<AirPlaneTicketDocument>,

		@InjectModel(Booking.name)
		private BookingRepository: Model<BookingDocument>,

		@InjectModel(Passanger.name)
		private PassangerRepository: Model<PassangerDocument>,

		@InjectModel(Payment.name)
		private PaymentRepository: Model<PaymentDocument>,
	) {}

	onApplicationBootstrap() {
		this.flight = new MongoGenericRepository<Flight>(this.FlightRepository);
		this.airPlaneTicket = new MongoGenericRepository<AirPlaneTicket>(
			this.AirplaneRepository,
			['flight'],
		);
		this.booking = new MongoGenericRepository<Booking>(this.BookingRepository);
		this.passanger = new MongoGenericRepository<Passanger>(
			this.PassangerRepository,
		);
		this.payment = new MongoGenericRepository<Payment>(this.PaymentRepository);
		mongoose.set('debug', true);
	}
}
