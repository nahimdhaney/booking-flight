import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/application/services/data-service/data-services.module';
// import { DataServicesModule } from '../../data-services/data-services.module';
import { BookingFactoryService } from './booking-factory.service';
import { BookingServices } from './booking-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [BookingFactoryService, BookingServices],
  exports: [BookingFactoryService, BookingServices],
})
export class BookingServicesModule {}
