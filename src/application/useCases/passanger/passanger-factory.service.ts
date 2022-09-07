import { Injectable } from '@nestjs/common';
import { RowTicketDto } from 'application/dto/rowTicket.dto';
import { AirPlaneTicket } from 'domain/airplaneTicket/model';
import { Price } from 'shared/ValueObjects/price';
import { Seat } from 'shared/ValueObjects/seat';
import { v4 as uuid } from 'uuid';
import { Passanger } from '../../../domain/passanger/model';
import { PassangerDto, UpdatePassangerDto } from '../../dto/passanger.dto';

@Injectable()
export class PassangerFactoryService {
	createNewPassanger(createPassangerDto: PassangerDto) {
		const passangerToInsert = new Passanger(
			createPassangerDto.name,
			createPassangerDto.lastName,
			createPassangerDto.passport,
		);

		return passangerToInsert;
	}

	updatePassanger(updatePassangerDto: UpdatePassangerDto) {
		const newPassanger = new Passanger();

		return newPassanger;
	}
}
