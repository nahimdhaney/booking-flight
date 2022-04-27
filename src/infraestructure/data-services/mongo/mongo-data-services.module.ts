import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
// import { IDataServices } from '../../../core';
import { DATA_BASE_CONFIGURATION } from '../../../configuration';
import { AirPlaneTicket, AirPlaneTicketSchema, Flight, FlightSchema } from './model';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Flight.name, schema: FlightSchema },
      { name: AirPlaneTicket.name, schema: AirPlaneTicketSchema },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
