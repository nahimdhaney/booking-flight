import { Injectable } from '@nestjs/common';
import { PassangerFactoryService } from './passanger-factory.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Passanger } from '../../../domain/passanger/model';
import { PassangerDto, UpdatePassangerDto } from '../../dto/passanger.dto';
import { IDataServices } from '../../abstracts/data-services.abstract';
import { MessageProducer } from '../producer/producer.service';
import { messageProducerSNS } from '../producer/producer.sns.service';

@Injectable()
export class PassangerServices {
	constructor(
		private dataServices: IDataServices,
		private passangerFactoryService: PassangerFactoryService,
		private eventEmitter: EventEmitter2,
		private producer: messageProducerSNS,
	) {}

	getAllPassangers(): Promise<Passanger[]> {
		return this.dataServices.passanger.getAll();
	}

	getPassangerById(id: any): Promise<Passanger> {
		return this.dataServices.passanger.get(id);
	}

	async createPassanger(
		createPassangerDto: PassangerDto,
	): Promise<Passanger> {
		const passanger =
			this.passangerFactoryService.createNewPassanger(createPassangerDto);

		const createdPassanger = await this.dataServices.passanger.create(
			passanger,
		);

		this.eventEmitter.emit('passanger.created', createdPassanger);
		this.producer.sendMessage(
			{
				id: createdPassanger.id,
				body: {
					passanger: createdPassanger,
					event: 'PasajeroCreado',
				},
			},
			'arn:aws:sns:us-east-1:191300708619:PasajeroCreado',
		);

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
