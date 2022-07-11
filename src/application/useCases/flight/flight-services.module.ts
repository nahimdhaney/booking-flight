import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
import { FlightFactoryService } from './flight-factory.service';
import { FlightServices } from './flight-services.service';

@Module({
	imports: [DataServicesModule],
	providers: [FlightFactoryService, FlightServices],
	exports: [FlightFactoryService, FlightServices],
})
export class FlightServicesModule {}
