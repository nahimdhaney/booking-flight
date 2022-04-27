import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class FlightDto {

  id: string;

  destinyId: string;

  originId: string;

  flightNumber:string;

  departureTime:Date;
  
  arrivalTime:Date;
  
  
}

export class UpdateFlightDto extends PartialType(FlightDto) {}
