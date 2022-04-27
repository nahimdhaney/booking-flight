import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { FlightEntity } from 'src/domain/entities/flight.entity';
// import { IDataServices } from 'src/application/services/flight';
import { Flight } from 'src/domain/flight/model';
// import { IDataServices } from '../../../core/abstracts';
// import { FlightDto, UpdateFlightDto } from '../../../core/dtos';
import { FlightFactoryService } from './flight-factory.service';
import { v4 as uuid } from 'uuid';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { arrayMinSize } from 'class-validator';
import { AirPlaneTicket } from 'src/application/dto/airPlaneTicket.dto';
@Injectable()
export class FlightServices {
  constructor(
    private dataServices: IDataServices,
    private FlightFactoryService: FlightFactoryService,
  ) { }

  getAllFlights(): Promise<FlightDto[]> {
    return this.dataServices.flight.getAll();
  }

  getFlightById(id: any): Promise<FlightDto> {

    return this.dataServices.flight.get(id);
  }

  async createFlight(createFlightDto: FlightDto): Promise<FlightDto> {

    // const flight = this.FlightFactoryService.createNewFlight(createFlightDto);

    const createdFlight = await this.dataServices.flight.create(createFlightDto);
    const ticket = new AirPlaneTicket();
    ticket.code ="12";
    ticket.price = 100.42;
    ticket.flight = createdFlight
    
    await this.dataServices.airPlaneTicket.create(ticket);

    return createdFlight;
  }

  updateFlight(
    FlightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<FlightDto> {
    const flight = this.FlightFactoryService.updateFlight(updateFlightDto);
    return this.dataServices.flight.update(FlightId, flight);
  }
}
