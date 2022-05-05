import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { v4 as uuid } from 'uuid';

export class CreateBookingDto {

  id:uuid;

  @IsString()
  @IsNotEmpty()
  reservationNumber: string;

  @IsString()
  @IsNotEmpty()
  airPlaneTicket: uuid;
  
  airPlane: uuid;

  passanger: uuid;

  reservationStatus: string;

  date: Date;

  value: number;

}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
