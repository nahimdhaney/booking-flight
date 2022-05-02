import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { FlightNumber } from 'src/shared/ValueObjects/flightNumber';
import { FlightTime } from 'src/shared/ValueObjects/flightTime';
import { v4 as uuid } from 'uuid';
import { RowTicketDto } from './rowTicket.dto';

export class FlightDto {

  id: uuid;

  destinyId: uuid;

  originId: uuid;

  flightNumber:FlightNumber;

  departureTime:Date;
  
  arrivalTime:Date;
  
  flightTime:FlightTime;

  tickets:Array<RowTicketDto>
  
}

export class UpdateFlightDto extends PartialType(FlightDto) {}
