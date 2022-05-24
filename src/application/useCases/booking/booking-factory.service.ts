import { Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto } from 'src/application/dto/booking.dto';
import { v4 as uuid } from 'uuid';
import { Booking } from 'src/domain/booking/model';
import { ReservationNumber } from 'src/shared/ValueObjects/reservationNumber';
import { ReservationStatus } from 'src/shared/ValueObjects/ReservationStatus';
import { Amount } from 'src/shared/ValueObjects/amount';
import { AccountReceivable } from 'src/domain/accountReceivable/model';
@Injectable()
export class BookingFactoryService {
    createNewBooking(createBookingDto: CreateBookingDto) {
        const number = createBookingDto.reservationNumber;
        const reservationNumber = new ReservationNumber(number);

        // obtain some uuid
        // TODO  
        
        let account = new AccountReceivable(new Amount(createBookingDto.value));

        return new Booking(
            reservationNumber,
            createBookingDto.airPlaneTicket,
            new uuid(),
            createBookingDto.passanger,
            new ReservationStatus(createBookingDto.reservationStatus),
            new Date(),
            account
        );
    }

    updateBooking(updateBookingDto: UpdateBookingDto) {
        const newBooking = new Booking();

        return newBooking;
    }
}
