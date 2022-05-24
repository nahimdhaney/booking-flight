
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { FlightDto } from 'src/application/dto/flight.dto';

import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Booking } from 'src/domain/booking/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AirPlaneTicketCommands {
  constructor(
    private dataServices: IDataServices,
    private eventEmitter: EventEmitter2,
  ) { }

  @OnEvent('booking.created')
  async handleFlightCreatedEvent(payload: Booking) {
    //changing status 
    const ticket = await this.dataServices.airPlaneTicket.get(payload.airPlaneTicket)

    if (!ticket) {
      throw new Error("unable to get the ticket")
    } else {
      // checking status
      ticket.status = 'booked'
    }

    await this.dataServices.airPlaneTicket.update(payload.airPlaneTicket, ticket)

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
