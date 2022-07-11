import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import {
	PassangerDto,
	UpdatePassangerDto,
} from 'src/application/dto/passanger.dto';
import { PassangerServices } from 'src/application/useCases/passanger';
import { Passanger } from 'src/domain/passanger/model';

@Controller('api/passanger')
export class PassangerController {
	constructor(private passangerServices: PassangerServices) {}

	@Get()
	async getAll() {
		return this.passangerServices.getAllPassangers();
	}

	@Get(':id')
	async getById(@Param('id') id: any) {
		return this.passangerServices.getPassangerById(id);
	}

	@Post()
	createPassanger(@Body() passangerDto: PassangerDto) {
		return this.passangerServices.createPassanger(passangerDto);
	}

	@Put(':id')
	updatePassanger(
		@Param('id') passangerId: string,
		@Body() updatePassangerDto: UpdatePassangerDto,
	) {
		return this.passangerServices.updatePassanger(
			passangerId,
			updatePassangerDto,
		);
	}
}
