import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataServicesModule } from './application/services/data-service/data-services.module';
import { FlightServicesModule } from './application/useCases/flight';
import { FlightController } from './controllers/flight.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AirPlaneTicketServicesModule } from './application/useCases/airPlaneTicket';

@Module({
  imports: [EventEmitterModule.forRoot(),
    DataServicesModule,FlightServicesModule,AirPlaneTicketServicesModule],
  controllers: [AppController,FlightController],
  providers: [AppService],
})
export class AppModule {}
