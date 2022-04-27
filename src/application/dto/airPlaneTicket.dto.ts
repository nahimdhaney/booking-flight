import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AirPlaneTicket {


  code: string;

  price: number;

  flight:any;
  
}

export class UpdateAirPlaneTicket extends PartialType(AirPlaneTicket) {}
