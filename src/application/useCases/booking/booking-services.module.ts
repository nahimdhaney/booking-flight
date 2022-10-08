import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-service/data-services.module';
import { ProducerModule } from '../producer/producer.module';
import { BookingCommands } from './booking-commands';
import { BookingFactoryService } from './booking-factory.service';
import { BookingServices } from './booking-services.service';

@Module({
	imports: [DataServicesModule, ProducerModule],
	providers: [BookingFactoryService, BookingServices, BookingCommands],
	exports: [BookingFactoryService, BookingServices, BookingCommands],
})
export class BookingServicesModule {}
