import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataServicesModule } from './application/services/data-service/data-services.module';
import { FlightServicesModule } from './application/useCases/flight';
import { FlightController } from './controllers/flight.controller';

@Module({
  imports: [DataServicesModule,FlightServicesModule],
  controllers: [AppController,FlightController],
  providers: [AppService],
})
export class AppModule {}
