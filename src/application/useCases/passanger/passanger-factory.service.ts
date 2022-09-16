import { Injectable } from '@nestjs/common';
import { Passanger } from '../../../domain/passanger/model';
import { PassangerDto, UpdatePassangerDto } from '../../dto/passanger.dto';

@Injectable()
export class PassangerFactoryService {
	createNewPassanger(createPassangerDto: PassangerDto) {
		const passangerToInsert = new Passanger(
			createPassangerDto.name,
			createPassangerDto.lastName,
			createPassangerDto.passport,
			createPassangerDto.needsAssistance,
		);

		return passangerToInsert;
	}

	updatePassanger(updatePassangerDto: UpdatePassangerDto) {
		const newPassanger = new Passanger();

		return newPassanger;
	}
}
