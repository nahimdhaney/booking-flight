import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
import { BookingCommands } from './booking-commands';
import { BookingFactoryService } from './booking-factory.service';
import { BookingServices } from './booking-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [BookingFactoryService, BookingServices,BookingCommands],
  exports: [BookingFactoryService, BookingServices,BookingCommands],
})
export class BookingServicesModule {}
