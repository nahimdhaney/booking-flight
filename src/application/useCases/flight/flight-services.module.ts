import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-service/data-services.module';
import { ProducerModule } from '../producer/producer.module';
import { FlightFactoryService } from './flight-factory.service';
import { FlightServices } from './flight-services.service';

@Module({
	imports: [DataServicesModule, ProducerModule],
	providers: [FlightFactoryService, FlightServices],
	exports: [FlightFactoryService, FlightServices],
})
export class FlightServicesModule {}
