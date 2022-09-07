import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import {
	CreateBookingDto,
	UpdateBookingDto,
} from '../application/dto/booking.dto';
import { BookingServices } from '../application/useCases/booking';

@Controller('api/booking')
export class BookingController {
	constructor(private bookingServices: BookingServices) {}

	@Get()
	async getAll() {
		return this.bookingServices.getAllBookings();
	}

	@Get(':id')
	async getById(@Param('id') id: any) {
		return this.bookingServices.getBookingById(id);
	}

	@Post()
	createBooking(@Body() bookingDto: CreateBookingDto) {
		return this.bookingServices.createBooking(bookingDto);
	}

	@Put(':id')
	updateBook(
		@Param('id') bookingId: string,
		@Body() updateBookDto: UpdateBookingDto,
	) {
		return this.bookingServices.updateBooking(bookingId, updateBookDto);
	}
}
