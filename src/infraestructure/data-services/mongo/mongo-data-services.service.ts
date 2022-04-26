import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
  Flight
} from './model';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  flight: MongoGenericRepository<Flight>;

  constructor(
    @InjectModel(Flight.name)
    private FlightRepository: Model<Flight>,
  ) {}

  onApplicationBootstrap() {
    this.flight = new MongoGenericRepository<Flight>(this.FlightRepository);
  }
}
