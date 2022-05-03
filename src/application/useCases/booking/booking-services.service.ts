import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { CreateBookingDto, UpdateBookingDto } from 'src/application/dto/booking.dto';
import { Booking } from 'src/domain/booking/model';
import { BookingFactoryService } from './booking-factory.service';

@Injectable()
export class BookingServices {
  constructor(
    private dataServices: IDataServices,
    private BookingFactoryService: BookingFactoryService,
  ) {}

  getAllBookings(): Promise<Booking[]> {
    return this.dataServices.booking.getAll();
  }

  getBookingById(id: any): Promise<Booking> {
    return this.dataServices.booking.get(id);
  }

  createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const Booking = this.BookingFactoryService.createNewBooking(createBookingDto);
    return this.dataServices.booking.create(Booking);
  }

  updateBooking(
    BookingId: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const Booking = this.BookingFactoryService.updateBooking(updateBookingDto);
    return this.dataServices.booking.update(BookingId, Booking);
  }
}
