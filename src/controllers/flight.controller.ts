import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { FlightDto, UpdateFlightDto } from 'src/application/dto/flight.dto';
import { FlightServices } from 'src/application/useCases/flight';
import { Flight } from 'src/domain/flight/model';

@Controller('api/flight')
export class FlightController {
	constructor(private flightServices: FlightServices) {}

	@Get()
	async getAll() {
		return this.flightServices.getAllFlights();
	}

	@Get('/openTicket')
	async getTicketByFlightIdAndType(
		@Query('flight') flight,
		@Query('clase') clase,
		@Query('status') status,
	) {
		const ticket = await this.flightServices.getTicketByFlightIdAndType(
			flight,
			clase,
			status,
		);
		const testNoting = {};
		testNoting;
		const test2 = {};
		return ticket;
	}

	@Get('/ticket')
	async getTicketId(@Query('id') id) {
		const ticket = await this.flightServices.getTicketById(id);
		return ticket;
	}

	@Get(':id')
	async getById(@Param('id') id: any) {
		return this.flightServices.getFlightById(id);
	}

	@Post()
	createFlight(@Body() flightDto: FlightDto) {
		// console.log(flightDto)
		return this.flightServices.createFlight(flightDto);
	}

	@Put(':id')
	updateFlight(
		@Param('id') flightId: string,
		@Body() updateFlightDto: UpdateFlightDto,
	) {
		return this.flightServices.updateFlight(flightId, updateFlightDto);
	}
}
