import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import {
	PassangerDto,
	UpdatePassangerDto,
} from 'src/application/dto/passanger.dto';
import { Passanger } from 'src/domain/passanger/model';
import { PassangerFactoryService } from './passanger-factory.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PassangerServices {
	constructor(
		private dataServices: IDataServices,
		private passangerFactoryService: PassangerFactoryService,
		private eventEmitter: EventEmitter2,
	) {}

	getAllPassangers(): Promise<Passanger[]> {
		return this.dataServices.passanger.getAll();
	}

	getPassangerById(id: any): Promise<Passanger> {
		return this.dataServices.passanger.get(id);
	}

	async createPassanger(createPassangerDto: PassangerDto): Promise<Passanger> {
		const passanger =
			this.passangerFactoryService.createNewPassanger(createPassangerDto);

		const createdPassanger = await this.dataServices.passanger.create(
			passanger,
		);

		this.eventEmitter.emit('passanger.created', createdPassanger);

		return createdPassanger;
	}

	updatePassanger(
		passangerId: string,
		updatePassangerDto: UpdatePassangerDto,
	): Promise<Passanger> {
		const passanger =
			this.passangerFactoryService.updatePassanger(updatePassangerDto);
		return this.dataServices.passanger.update(passangerId, passanger);
	}
}
