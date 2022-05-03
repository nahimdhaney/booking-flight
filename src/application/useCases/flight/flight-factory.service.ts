import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { number } from 'joi';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { RowTicketDto } from 'src/application/dto/rowTicket.dto';
import { AirPlaneTicket } from 'src/domain/airplaneTicket/model';
// import { FlightEntity } from 'src/domain/entities/flight.entity';
import { Flight } from 'src/domain/flight/model';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { Price } from 'src/shared/ValueObjects/price';
import { Seat } from 'src/shared/ValueObjects/seat';
import { v4 as uuid } from 'uuid';


@Injectable()
export class FlightFactoryService {

  createNewFlight(createFlightDto: FlightDto) {

    const number = createFlightDto.flightNumber;
    const time = new FlightTime(new Date(createFlightDto.departureTime), new Date(createFlightDto.arrivalTime))

    const flightToInsert = new Flight(
      createFlightDto.originId,
      createFlightDto.destinyId,
      number, time);

    return flightToInsert;
  }


  generateTicketFlight(rowTicket: RowTicketDto,flight: uuid) {

    let tickets = []
    let alphabet = String.fromCharCode(...Array(123).keys()).slice(97).toUpperCase();
    let letter = 0;
    let code = 1;
    for (let index = 0; index < rowTicket.quant; index++) {
      let seat = new Seat(rowTicket.clase + "-" + alphabet[letter] + code);
      let price = new Price(rowTicket.price);
      let ticket = new AirPlaneTicket(seat, price,flight);
      if (index % 9 == 0) {
        letter++;
        code = 1;
      } else {
        code++;
      }
      console.log(code);
      tickets.push(ticket)
    }
    console.log(tickets);
    return tickets;
  }


  updateFlight(updateFlightDto: UpdateFlightDto) {
    const newFlight = new Flight();

    return newFlight;
  }
}
