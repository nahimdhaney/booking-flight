import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
import { AirPlaneTicketCommands } from './airPlaneTicket-commands';

@Module({
  imports: [DataServicesModule],
  providers: [AirPlaneTicketCommands],
  exports: [AirPlaneTicketCommands],
})
export class AirPlaneTicketServicesModule {}
