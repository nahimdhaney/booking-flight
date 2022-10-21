import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AccountReceivable } from '../../../domain/accountReceivable/model';
import { Booking } from '../../../domain/booking/model';
import { Amount } from '../../../shared/ValueObjects/amount';
import { ReservationNumber } from '../../../shared/ValueObjects/reservationNumber';
import { ReservationStatus } from '../../../shared/ValueObjects/reservationStatus';
import { CreateBookingDto, UpdateBookingDto } from '../../dto/booking.dto';

@Injectable()
export class BookingFactoryService {
	createNewBooking(createBookingDto: CreateBookingDto) {
		const number = createBookingDto.reservationNumber;
		const reservationNumber = new ReservationNumber(number);

		// obtain some uuid
		// TODO

		const account = new AccountReceivable(
			new Amount(createBookingDto.value),
		);

		return new Booking(
			reservationNumber,
			createBookingDto.airPlaneTicket,
			createBookingDto.flight,
			createBookingDto.passanger,
			new ReservationStatus(createBookingDto.reservationStatus),
			new Date(),
			account,
		);
	}

	updateBooking(updateBookingDto: UpdateBookingDto) {
		const reservationNumber = new ReservationNumber(
			updateBookingDto.reservationNumber,
		);

		const account = new AccountReceivable(
			new Amount(updateBookingDto.value),
		);

		const newBooking = new Booking(
			reservationNumber,
			updateBookingDto.airPlaneTicket,
			updateBookingDto.id,
			updateBookingDto.passanger,
			new ReservationStatus(updateBookingDto.reservationStatus),
			new Date(),
			account,
		);

		return newBooking;
	}
}
