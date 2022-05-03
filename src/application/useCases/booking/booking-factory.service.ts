import { Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto } from 'src/application/dto/booking.dto';
// import { Booking } from 'src/domain/booking/model';
import { Booking } from 'src/domain/booking/model';
@Injectable()
export class BookingFactoryService {
  createNewBooking(createBookingDto: CreateBookingDto) {
    const newBooking = new Booking(); 
    return newBooking;
  }

  updateBooking(updateBookingDto: UpdateBookingDto) {
    const newBooking = new Booking();

    return newBooking;
  }
}
