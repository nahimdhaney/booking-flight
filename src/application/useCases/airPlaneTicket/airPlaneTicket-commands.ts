
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';

import { AirPlaneTicket } from 'src/application/dto/airPlaneTicket.dto';
import { OnEvent } from '@nestjs/event-emitter';


export class AirPlaneTicketCommands {
  constructor(
    private dataServices: IDataServices,
  ) { }

  @OnEvent('flight.created')
  handleFlightCreatedEvent(payload: FlightDto) {
    // Generating tickets 
    
  }

  
//   async createFlight(createFlightDto: FlightDto): Promise<FlightDto> {

//     const createdFlight = await this.dataServices.flight.create(createFlightDto);
//     const ticket = new AirPlaneTicket();
//     ticket.code ="12";
//     ticket.price = 100.42;
//     ticket.flight = createdFlight
    
//     await this.dataServices.airPlaneTicket.create(ticket);

//     return createdFlight;
//   }

}
