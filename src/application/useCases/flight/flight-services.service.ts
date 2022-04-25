import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { CreateFlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
// import { IDataServices } from 'src/application/services/flight';
import { Flight } from 'src/domain/flight/model';
// import { Flight } from '../../../core/entities';
// import { IDataServices } from '../../../core/abstracts';
// import { CreateFlightDto, UpdateFlightDto } from '../../../core/dtos';
import { FlightFactoryService } from './flight-factory.service';

@Injectable()
export class FlightServices {
  constructor(
    private dataServices: IDataServices,
    private FlightFactoryService: FlightFactoryService,
  ) {}

  getAllFlights(): Promise<Flight[]> {
    return this.dataServices.flight.getAll();
  }

  getFlightById(id: any): Promise<Flight> {
    return this.dataServices.flight.get(id);
  }

  createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const Flight = this.FlightFactoryService.createNewFlight(createFlightDto);
    return this.dataServices.flight.create(Flight);
  }

  updateFlight(
    FlightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const Flight = this.FlightFactoryService.updateFlight(updateFlightDto);
    return this.dataServices.flight.update(FlightId, Flight);
  }
}
