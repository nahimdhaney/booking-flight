import { Injectable } from '@nestjs/common';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
// import { FlightEntity } from 'src/domain/entities/flight.entity';
import { Flight } from 'src/domain/flight/model';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';


@Injectable()
export class FlightFactoryService {
  createNewFlight(createFlightDto: FlightDto) {

    const number = new FlightNumber(createFlightDto.flightNumber);
    const time = new FlightTime(createFlightDto.departureTime, createFlightDto.arrivalTime)

    const flightToInsert = new Flight(
      createFlightDto.originId, createFlightDto.destinyId, number, "crew", "", time);

    return flightToInsert;
  }

  updateFlight(updateFlightDto: UpdateFlightDto) {
    const newFlight = new FlightDto();

    return newFlight;
  }
}
