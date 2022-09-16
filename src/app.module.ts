import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from './infraestructure/data-services/mongo/mongo-data-services.module';
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
import { ProducerModule } from './application/useCases/producer/producer.module';
import { ConsumerModule } from './application/useCases/consumer/consumer.module';
// import { SqsConfig, SqsConfigOption, SqsModule } from '@nestjs-packages/sqs';

@Module({
	imports: [
		ProducerModule,
		ConsumerModule,
		MongoDataServicesModule,
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
