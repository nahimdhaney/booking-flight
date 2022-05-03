import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataServicesModule } from './application/services/data-service/data-services.module';
import { FlightServicesModule } from './application/useCases/flight';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AirPlaneTicketServicesModule } from './application/useCases/airPlaneTicket';
import { BookingServicesModule } from './application/useCases/booking';
import { BookingController, FlightController } from './controllers';

@Module({
  imports: [EventEmitterModule.forRoot(),
    DataServicesModule,FlightServicesModule,AirPlaneTicketServicesModule,BookingServicesModule],
  controllers: [AppController,FlightController,BookingController],
  providers: [AppService],
})
export class AppModule {}
