import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { CreateBookingDto, UpdateBookingDto } from 'src/application/dto/booking.dto';
import { Booking } from 'src/domain/booking/model';
import { BookingFactoryService } from './booking-factory.service';

@Injectable()
export class BookingServices {
  constructor(
    private dataServices: IDataServices,
    private BookingFactoryService: BookingFactoryService,
    private eventEmitter: EventEmitter2,
  ) {}

  getAllBookings(): Promise<Booking[]> {
    return this.dataServices.booking.getAll();
  }

  getBookingById(id: any): Promise<Booking> {
    return this.dataServices.booking.get(id);
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    
    const booking = this.BookingFactoryService.createNewBooking(createBookingDto);
    // const accountReceivable = th
    const createdBooking = this.dataServices.booking.create(booking);

    
    this.eventEmitter.emit(
      'booking.created',
      createdBooking
    );

    return createdBooking
  }

  updateBooking(
    BookingId: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = this.BookingFactoryService.updateBooking(updateBookingDto);
    return this.dataServices.booking.update(BookingId, booking);
  }
}
