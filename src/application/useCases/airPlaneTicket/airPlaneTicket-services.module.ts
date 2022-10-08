import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-service/data-services.module';
import { ProducerModule } from '../producer/producer.module';
import { AirPlaneTicketCommands } from './airPlaneTicket-commands';

@Module({
	imports: [DataServicesModule, ProducerModule],
	providers: [AirPlaneTicketCommands],
	exports: [AirPlaneTicketCommands],
})
export class AirPlaneTicketServicesModule {}
