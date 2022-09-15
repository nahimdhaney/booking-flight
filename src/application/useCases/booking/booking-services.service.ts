import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Console } from 'console';
import { Booking } from '../../../domain/booking/model';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { CreateBookingDto, UpdateBookingDto } from '../../dto/booking.dto';
import { MessageProducer } from '../producer/producer.service';
// import { MessageProducer } from '../producer/producer.service';

import { BookingFactoryService } from './booking-factory.service';

@Injectable()
export class BookingServices {
	constructor(
		private dataServices: IDataServices,
		private bookingFactoryService: BookingFactoryService,
		private eventEmitter: EventEmitter2,
		private producer: MessageProducer,
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

		this.producer.sendMessage({
			id: createdBooking.id,
			body: { booking: createdBooking, event: 'ReservaCreada' },
		});

		return createdBooking;
	}

	updateBooking(
		BookingId: string,
		updateBookingDto: UpdateBookingDto,
	): Promise<Booking> {
		const booking =
			this.bookingFactoryService.updateBooking(updateBookingDto);
		return this.dataServices.booking.update(BookingId, booking);
	}
}
