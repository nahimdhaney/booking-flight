import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFlightDto {

  @IsString()
  @IsNotEmpty()
  destinyId: string;

  @IsString()
  @IsNotEmpty()
  originId: string;

  flightNumber:string;

  flightTime:string;
  
  // tickets:string;
  
  
}

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}
