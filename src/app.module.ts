import { Module } from '@nestjs/common';
import { DataServicesModule } from './application/services/data-service/data-services.module';
import { FlightServicesModule } from './application/useCases/flight';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AirPlaneTicketServicesModule } from './application/useCases/airPlaneTicket';
import { BookingServicesModule } from './application/useCases/booking';
import {
	BookingController,
	FlightController,
	PassangerController,
	PaymentController,
} from './controllers';
import { PassangerServicesModule } from './application/useCases/passanger';
import { PaymentServicesModule } from './application/useCases/payment';

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		DataServicesModule,
		FlightServicesModule,
		AirPlaneTicketServicesModule,
		BookingServicesModule,
		PassangerServicesModule,
		PaymentServicesModule,
	],
	controllers: [
		FlightController,
		BookingController,
		PassangerController,
		PaymentController,
	],
})
export class AppModule {}
