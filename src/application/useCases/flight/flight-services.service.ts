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
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class FlightServices {
  constructor(
    private dataServices: IDataServices,
    private FlightFactoryService: FlightFactoryService,
    private eventEmitter: EventEmitter2,
  ) { }

  getAllFlights(): Promise<Flight[]> {
    return this.dataServices.flight.getAll();
  }

  getFlightById(id: any): Promise<Flight> {

    return this.dataServices.flight.get(id);
  }

  async createFlight(createFlightDto: FlightDto): Promise<Flight> {

    const flight = this.FlightFactoryService.createNewFlight(createFlightDto);

    const createdFlight = await this.dataServices.flight.create(flight);
    
    for (let index = 0; index < createFlightDto.tickets.length; index++) {
      const ticketsToCreate = createFlightDto.tickets[index];
      const tickets =  this.FlightFactoryService.generateTicketFlight(ticketsToCreate);
      // persist
      console.log(tickets);
      await this.dataServices.airPlaneTicket.create(tickets[0])
      await this.dataServices.airPlaneTicket.create(tickets[1])
      await this.dataServices.airPlaneTicket.create(tickets[2])
    }

    this.eventEmitter.emit(
      'flight.created',
      createdFlight
    );    

    // await this.dataServices.airPlaneTicket.create(ticket);

    return createdFlight;
  }

  updateFlight(
    flightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const flight = this.FlightFactoryService.updateFlight(updateFlightDto);
    return this.dataServices.flight.update(flightId,flight);
  }
}
