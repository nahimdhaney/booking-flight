import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Console } from 'console';
import { Booking } from '../../../domain/booking/model';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { CreateBookingDto, UpdateBookingDto } from '../../dto/booking.dto';
import { messageProducerSNS } from '../producer/producer.sns.service';

import { BookingFactoryService } from './booking-factory.service';

@Injectable()
export class BookingServices {
	constructor(
		private dataServices: IDataServices,
		private bookingFactoryService: BookingFactoryService,
		private eventEmitter: EventEmitter2,
		private producer: messageProducerSNS,
	) {}

	getAllBookings(): Promise<Booking[]> {
		return this.dataServices.booking.getAll();
	}

	getBookingById(id: any): Promise<Booking> {
		return this.dataServices.booking.get(id);
	}

	async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
		const booking = await this.bookingFactoryService.createNewBooking(
			createBookingDto,
		);

		const createdBooking = await this.dataServices.booking.create(booking);

		this.eventEmitter.emit('booking.created', createdBooking);

		// this.producer.sendMessage(
		// 	{
		// 		id: createdBooking.id,
		// 		body: { booking: createdBooking, event: 'ReservaCreada' },
		// 	},
		// 	'arn:aws:sns:us-east-1:191300708619:ReservaCreada',
		// );

		return createdBooking;
	}

	async updateBooking(
		bookingId: string,
		updateBookingDto: any,
	): Promise<Booking> {
		// const booking = await this.bookingFactoryService.updateBooking(
		// 	updateBookingDto,
		// );
		try {
			const updatedBooking = await this.dataServices.booking.update(
				bookingId,
				updateBookingDto,
			);

			if (updatedBooking.reservationStatus == 'canceled') {
				this.eventEmitter.emit('booking.canceled', bookingId);
			}

			return updatedBooking;
		} catch (error) {
			return error;
		}
	}
}
