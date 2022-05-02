import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { v4 as uuid } from 'uuid';

export class FlightDto {

  id: uuid;

  destinyId: uuid;

  originId: uuid;

  flightNumber:FlightNumber;

  departureTime:Date;
  
  arrivalTime:Date;
  
  flightTime:FlightTime;
  // airPlaneTickets:any;
  
}

export class UpdateFlightDto extends PartialType(FlightDto) {}
