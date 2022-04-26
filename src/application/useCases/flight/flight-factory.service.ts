import { Injectable } from '@nestjs/common';
import { CreateFlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { Flight } from 'src/domain/entities/flight.entity';
// import { Flight } from 'src/domain/flight/model';


@Injectable()
export class FlightFactoryService {
  createNewFlight(createFlightDto: CreateFlightDto) {
    const newFlight = new Flight();
    // newFlight.firstName = createFlightDto.firstName;
    // newFlight.lastName = createFlightDto.lastName;

    return newFlight;
  }

  updateFlight(updateFlightDto: UpdateFlightDto) {
    const newFlight = new Flight();
    // newFlight.firstName = updateFlightDto.firstName;
    // newFlight.lastName = updateFlightDto.lastName;

    return newFlight;
  }
}
