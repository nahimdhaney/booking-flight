import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { AirPlaneTicket } from 'src/domain/airplaneTicket/model';
import { Flight } from 'src/domain/flight/model';
import { FlightFactoryService } from './flight-factory.service';

@Injectable()
export class FlightServices {
  constructor(
    private dataServices: IDataServices,
    private flightFactoryService: FlightFactoryService,
    private eventEmitter: EventEmitter2,
  ) { }

  getAllFlights(): Promise<Flight[]> {
    return this.dataServices.flight.getAll();
  }

  getFlightById(id: any): Promise<Flight> {

    return this.dataServices.flight.get(id);
  }

  getTicketById(id: any): Promise<AirPlaneTicket> {

    return this.dataServices.airPlaneTicket.get(id);
  }

  async getTicketByFlightIdAndType(flight_id: string,clase:string,status:string): Promise<AirPlaneTicket> {

    const airplaneticket = await this.dataServices.airPlaneTicket.query({flight:flight_id,clase:clase,status:status});
    // console.log(airplaneticket);
    return airplaneticket[0];

  }

  async createFlight(createFlightDto: FlightDto): Promise<Flight> {

    const flight = this.flightFactoryService.createNewFlight(createFlightDto);

    const createdFlight = await this.dataServices.flight.create(flight);

    for (let index = 0; index < createFlightDto.tickets.length; index++) {

      const ticketsToCreate = createFlightDto.tickets[index];
      const tickets = this.flightFactoryService.generateTicketFlight(ticketsToCreate, createdFlight.id);
      
      for (let y = 0; y < tickets.length; y++) {
        const element = tickets[y];
        await this.dataServices.airPlaneTicket.create(element)
      }
      
    }

    this.eventEmitter.emit(
      'flight.created',
      createdFlight
    );

    return createdFlight;
  }

  updateFlight(
    flightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const flight = this.flightFactoryService.updateFlight(updateFlightDto);
    return this.dataServices.flight.update(flightId, flight);
  }
}
