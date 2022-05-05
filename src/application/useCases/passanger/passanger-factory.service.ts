import { Injectable } from '@nestjs/common';
import { PassangerDto, UpdatePassangerDto } from 'src/application/dto/passanger.dto';
import { RowTicketDto } from 'src/application/dto/rowTicket.dto';
import { AirPlaneTicket } from 'src/domain/airplaneTicket/model';
import { Passanger } from 'src/domain/passanger/model';
import { Price } from 'src/shared/ValueObjects/price';
import { Seat } from 'src/shared/ValueObjects/seat';
import { v4 as uuid } from 'uuid';


@Injectable()
export class PassangerFactoryService {

  createNewPassanger(createPassangerDto: PassangerDto) {


    const passangerToInsert = new Passanger(
      createPassangerDto.name,
      createPassangerDto.lastName,
      createPassangerDto.passport);

    return passangerToInsert;
  }



  updatePassanger(updatePassangerDto: UpdatePassangerDto) {
    const newPassanger = new Passanger();

    return newPassanger;
  }
}
