import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataServicesModule } from './application/services/data-service/data-services.module';
import { FlightServicesModule } from './application/useCases/flight';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AirPlaneTicketServicesModule } from './application/useCases/airPlaneTicket';
import { BookingServicesModule } from './application/useCases/booking';
import { BookingController, FlightController, PassangerController } from './controllers';
import { PassangerServicesModule } from './application/useCases/passanger';

@Module({
  imports: [EventEmitterModule.forRoot(),
    DataServicesModule, FlightServicesModule,
    AirPlaneTicketServicesModule, BookingServicesModule,
    PassangerServicesModule],
  controllers: [AppController,
    FlightController,
    BookingController,
    PassangerController
  ],
  providers: [AppService],
})
export class AppModule { }
