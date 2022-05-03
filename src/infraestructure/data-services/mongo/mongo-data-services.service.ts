import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
  Flight,
  AirPlaneTicket,
  AirPlaneTicketDocument,
  Booking,
  BookingDocument
} from './model';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  
  flight: MongoGenericRepository<Flight>;
  airPlaneTicket: MongoGenericRepository<AirPlaneTicket>;
  booking: MongoGenericRepository<Booking>;

  constructor(
    @InjectModel(Flight.name)
    private FlightRepository: Model<Flight>,

    @InjectModel(AirPlaneTicket.name)
    private AirplaneRepository: Model<AirPlaneTicketDocument>,

    @InjectModel(Booking.name)
    private BookingRepository: Model<BookingDocument>,

  ) {}


  onApplicationBootstrap() {
    this.flight = new MongoGenericRepository<Flight>(this.FlightRepository);
    this.airPlaneTicket = new MongoGenericRepository<AirPlaneTicket>(this.AirplaneRepository,[
      'flight'
    ]);
    this.booking = new MongoGenericRepository<Booking>(this.BookingRepository);

  }
}
